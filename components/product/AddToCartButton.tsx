"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products";

export default function AddToCartButton({
  product,
  soldOut,
}: {
  product: Product;
  soldOut: boolean;
}) {
  const [message, setMessage] = useState("");
  const { items, addToCart } = useCart();

  const cartItem = items.find((item) => item.productId === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const stockLimitReached = cartQuantity >= product.quantity;

  function handleAddToCart() {
    if (soldOut || stockLimitReached) {
      setMessage("Maximum available quantity reached.");
      return;
    }

    addToCart(product);
    setMessage("Added to cart!");
  }

  return (
    <>
      <button
        type="button"
        disabled={soldOut || stockLimitReached}
        onClick={handleAddToCart}
        className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start">
        {soldOut
          ? "Sold out"
          : stockLimitReached
            ? "Maximum quantity added"
            : "Add to cart"}
      </button>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className="mt-3 text-sm text-muted">
          {message}
        </p>
      )}
    </>
  );
}
