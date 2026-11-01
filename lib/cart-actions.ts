"use server";

import { getProductsByIds } from "./product-queries";
import type { Product } from "./products";

const MAX_CART_IDS = 50;

export async function getCartProducts(ids: string[]): Promise<Product[]> {
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > MAX_CART_IDS) {
    return [];
  }

  const cleanIds = ids.filter(
    (id): id is string =>
      typeof id === "string" && id.length > 0 && id.length <= 100,
  );

  return getProductsByIds(cleanIds);
}
