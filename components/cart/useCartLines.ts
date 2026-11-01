"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getCartProducts } from "@/lib/cart-actions";
import type { Product } from "@/lib/products";

export type CartLine = {
  product: Product;
  quantity: number;
};

export function useCartLines() {
  const { items } = useCart();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [failed, setFailed] = useState(false);

  const idsKey = items
    .map((item) => item.productId)
    .sort()
    .join(",");

  useEffect(() => {
    if (!idsKey) return;

    let cancelled = false;

    getCartProducts(idsKey.split(","))
      .then((result) => {
        if (cancelled) return;
        setProducts(result);
        setFailed(false);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  const lines: CartLine[] = products
    ? items.flatMap((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? [{ product, quantity: item.quantity }] : [];
      })
    : [];

  const loading = idsKey !== "" && products === null && !failed;

  return { lines, loading, failed: failed && idsKey !== "" };
}
