"use client";

import Link from "next/link";
import { useCartLines } from "@/components/cart/useCartLines";
import { useHydrated } from "@/lib/use-hydrated";
import CheckoutForm from "./CheckoutForm";
import CheckoutSkeleton from "./CheckoutSkeleton";
import OrderSummary from "./OrderSummary";

export default function CheckoutContent() {
  const { lines, loading, failed } = useCartLines();
  const hydrated = useHydrated();

  if (!hydrated || loading) {
    return <CheckoutSkeleton />;
  }

  if (failed && lines.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-muted">
          We couldn&apos;t load your cart. Check your connection and refresh
          the page.
        </p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="mb-4 text-muted">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block rounded-md bg-primary px-5 py-2 text-primary-foreground">
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
