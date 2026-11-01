import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import ClearCartOnMount from "@/components/order/ClearCartOnMount";
import formatPrice from "@/lib/format";
import { getOrderByReference } from "@/lib/order-queries";

const STATUS_LABELS = {
  PENDING: "Awaiting payment",
  PAID: "Paid",
  CANCELLED: "Cancelled",
} as const;

export default async function OrderConfirmation({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  await connection();

  const { reference } = await params;
  const { placed } = await searchParams;

  const order = await getOrderByReference(reference);

  if (!order) {
    notFound();
  }

  return (
    <>
      {placed === "1" && <ClearCartOnMount />}

      <h1 className="text-3xl font-bold text-primary">Thank you!</h1>
      <p className="mt-2 text-muted">
        Your order <strong className="text-foreground">{order.reference}</strong>{" "}
        has been received. Delivery to {order.city}, {order.state}.
      </p>

      <p className="mt-4 inline-block rounded-full bg-surface px-4 py-1 text-sm font-medium text-foreground">
        {STATUS_LABELS[order.status]}
      </p>

      <ul className="mt-8 divide-y divide-border rounded-lg border border-border bg-surface">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted">Qty {item.quantity}</p>
            </div>
            <p className="text-foreground">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between text-lg font-semibold">
        <span className="text-foreground">Total</span>
        <span className="text-primary">{formatPrice(order.total)}</span>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium text-primary hover:underline">
        Continue shopping
      </Link>
    </>
  );
}
