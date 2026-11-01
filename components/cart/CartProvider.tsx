"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "priscilliapro-cart";

const EMPTY_CART: CartItem[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_CART;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CART;

    return parsed.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.productId === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return EMPTY_CART;
  }
}

function getSnapshot(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedItems = parseCart(raw);
    }
  } catch {
    return cachedItems;
  }

  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }

  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addToCart = useCallback((product: Product) => {
    if (product.quantity <= 0) return;

    const current = getSnapshot();
    const existing = current.find((item) => item.productId === product.id);

    if (existing) {
      if (existing.quantity >= product.quantity) return;

      writeCart(
        current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    writeCart([...current, { productId: product.id, quantity: 1 }]);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    writeCart(getSnapshot().filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (!Number.isInteger(quantity)) return;

      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      writeCart(
        getSnapshot().map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
