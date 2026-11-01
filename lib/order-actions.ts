"use server";

import { randomBytes } from "node:crypto";
import { prisma } from "./prisma";
import {
  validateDelivery,
  type DeliveryDetails,
  type DeliveryErrors,
} from "./checkout-validation";

type OrderItemInput = { productId: string; quantity: number };

export type PlaceOrderInput = {
  delivery: DeliveryDetails;
  items: OrderItemInput[];
};

export type PlaceOrderResult =
  | { ok: true; reference: string; total: number }
  | { ok: false; error: string; fieldErrors?: DeliveryErrors };

class OrderError extends Error {}

const MAX_ORDER_LINES = 50;
const MAX_QUANTITY_PER_LINE = 99;

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function placeOrder(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult> {
  const delivery: DeliveryDetails = {
    fullName: asText(input?.delivery?.fullName),
    phone: asText(input?.delivery?.phone),
    email: asText(input?.delivery?.email),
    address: asText(input?.delivery?.address),
    city: asText(input?.delivery?.city),
    state: asText(input?.delivery?.state),
  };

  const fieldErrors = validateDelivery(delivery);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Please check your delivery details.", fieldErrors };
  }

  if (
    !Array.isArray(input.items) ||
    input.items.length === 0 ||
    input.items.length > MAX_ORDER_LINES
  ) {
    return { ok: false, error: "Your cart is empty." };
  }

  const wanted = new Map<string, number>();
  for (const item of input.items) {
    const productId = asText(item?.productId);
    const quantity = item?.quantity;

    if (
      !productId ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY_PER_LINE
    ) {
      return { ok: false, error: "Your cart has an invalid item." };
    }

    wanted.set(productId, (wanted.get(productId) ?? 0) + quantity);
  }

  const ids = [...wanted.keys()];

  try {
    const order = await prisma.$transaction(
      async (tx) => {
        const products = await tx.product.findMany({
          where: { id: { in: ids } },
        });
        const byId = new Map(products.map((product) => [product.id, product]));

        for (const id of ids) {
          if (!byId.has(id)) {
            throw new OrderError(
              "An item in your cart is no longer available. Please review your cart.",
            );
          }
        }

        for (const [id, quantity] of wanted) {
          const product = byId.get(id)!;

          const reserved = await tx.product.updateMany({
            where: { id, quantity: { gte: quantity } },
            data: { quantity: { decrement: quantity } },
          });

          if (reserved.count === 0) {
            throw new OrderError(
              product.quantity <= 0
                ? `Sorry, "${product.name}" has just sold out.`
                : `Sorry, only ${product.quantity} of "${product.name}" left. Please reduce the quantity.`,
            );
          }
        }

        await tx.product.updateMany({
          where: { id: { in: ids }, quantity: 0, soldOutAt: null },
          data: { soldOutAt: new Date() },
        });

        let total = 0;
        const lines = ids.map((id) => {
          const product = byId.get(id)!;
          const quantity = wanted.get(id)!;
          total += product.price * quantity;

          return {
            productId: id,
            name: product.name,
            price: product.price,
            quantity,
          };
        });

        return tx.order.create({
          data: {
            reference: `PP-${randomBytes(4).toString("hex").toUpperCase()}`,
            fullName: delivery.fullName.trim(),
            phone: delivery.phone.replace(/\s/g, ""),
            email: delivery.email.trim(),
            address: delivery.address.trim(),
            city: delivery.city.trim(),
            state: delivery.state,
            total,
            items: { create: lines },
          },
        });
      },
      { maxWait: 5000, timeout: 10000 },
    );

    return { ok: true, reference: order.reference, total: order.total };
  } catch (error) {
    if (error instanceof OrderError) {
      return { ok: false, error: error.message };
    }

    console.error("placeOrder failed:", error);
    return {
      ok: false,
      error: "We couldn't place your order. Please try again.",
    };
  }
}
