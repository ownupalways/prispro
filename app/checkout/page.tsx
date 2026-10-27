import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold text-primary">Checkout</h1>
      <CheckoutContent />
    </div>
  );
}
