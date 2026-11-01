"use client";

import { useEffect } from "react";
import { clearCart } from "@/components/cart/CartProvider";

export default function ClearCartOnMount() {
  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
