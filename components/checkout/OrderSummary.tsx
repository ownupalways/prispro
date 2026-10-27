import Image from "next/image";
import  formatPrice  from "@/lib/format";
import type { Product } from "@/lib/products";

export type SummaryLine = {
  product: Product;
  quantity: number;
};

export default function OrderSummary({
  lines,
  total,
}: {
  lines: SummaryLine[];
  total: number;
}) {
  return (
    <aside className="h-fit rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-4 text-lg font-semibold text-primary">Order summary</h2>

      <ul className="divide-y divide-border">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-3 py-3">
            <div className="relative aspect-3/4 w-16 shrink-0 overflow-hidden rounded">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="text-sm text-muted">Qty {quantity}</p>
            </div>
            <p className="text-foreground">
              {formatPrice(product.price * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-semibold">
        <span className="text-foreground">Subtotal</span>
        <span className="text-primary">{formatPrice(total)}</span>
      </div>
      <p className="mt-2 text-sm text-muted">Delivery fee is added at the next step.</p>
    </aside>
  );
}
