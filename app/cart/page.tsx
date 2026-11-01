"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useCartLines } from "@/components/cart/useCartLines";
import formatPrice from "@/lib/format";
import { useHydrated } from "@/lib/use-hydrated";

const MAX_QUANTITY_OPTIONS = 99;

function quantityOptions(stock: number) {
  const max = Math.max(1, Math.min(stock, MAX_QUANTITY_OPTIONS));
  return Array.from({ length: max }, (_, index) => index + 1);
}

export default function CartPage() {
  const { removeFromCart, updateQuantity } = useCart();
  const { lines, loading, failed } = useCartLines();
  const hydrated = useHydrated();

  if (!hydrated || loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold">Your Shopping Bag</h1>
        <div className="shimmer mt-8 h-64 rounded-lg" />
      </section>
    );
  }

  if (failed && lines.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Your Shopping Bag</h1>
        <p className="mt-4 text-muted">
          We couldn&apos;t load your cart. Check your connection and refresh
          the page.
        </p>
      </section>
    );
  }

  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Your Shopping Bag</h1>
        <p className="mt-4 text-muted">
          Your cart is empty. Discover something you love.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Your Shopping Bag</h1>

      <ul className="mt-8 divide-y divide-border">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-4 py-6 sm:gap-6">
            <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-surface sm:h-40 sm:w-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">
                  {product.category}
                </p>
                <h2 className="mt-1 font-semibold">{product.name}</h2>
                <p className="mt-2 font-medium text-primary">
                  {formatPrice(product.price)}
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="mt-3 text-sm text-muted underline hover:text-foreground">
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor={`quantity-${product.id}`}
                  className="text-sm text-muted">
                  Qty
                </label>

                <select
                  id={`quantity-${product.id}`}
                  value={quantity}
                  onChange={(event) =>
                    updateQuantity(product.id, Number(event.target.value))
                  }
                  className="rounded-md border border-border bg-background px-3 py-2">
                  {quantityOptions(product.quantity).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-border pt-6 text-right">
        <p className="text-sm text-muted">Subtotal</p>
        <p className="mt-1 text-2xl font-bold">{formatPrice(subtotal)}</p>
        <p className="mt-2 text-sm text-muted">
          Shipping and payment will be handled at checkout.
        </p>

        <Link
          href="/checkout"
          className="mt-4 block w-full rounded-md bg-primary px-5 py-3 text-center font-medium text-primary-foreground hover:opacity-90">
          Proceed to checkout
        </Link>

        <Link
          href="/"
          className="mt-4 block text-sm font-medium text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
