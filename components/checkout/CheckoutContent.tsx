"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { getProductById } from "@/lib/products";
import { useHydrated } from "@/lib/use-hydrated";
import CheckoutForm from "./CheckoutForm";
import OrderSummary, { type SummaryLine } from "./OrderSummary";

export default function CheckoutContent() {
  const { items } = useCart();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <div className="shimmer h-64 rounded-lg" />;
  }

  const lines: SummaryLine[] = items.flatMap((item) => {
    const product = getProductById(item.productId);
    if (!product) return [];
    return [{ product, quantity: item.quantity }];
  });

  if (lines.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="mb-4 text-muted">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block rounded-md bg-primary px-5 py-2 text-primary-foreground"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <CheckoutForm />
      <OrderSummary lines={lines} total={total} />
    </div>
  );
}
