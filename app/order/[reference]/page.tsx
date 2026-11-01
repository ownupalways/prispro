import { Suspense } from "react";
import OrderConfirmation from "./OrderConfirmation";

export const metadata = {
  title: "Your order",
  robots: { index: false },
};

export default function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Suspense fallback={<div className="shimmer h-64 rounded-lg" />}>
        <OrderConfirmation params={params} searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
