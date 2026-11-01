import "server-only";
import type { Product as ProductRow } from "../generated/prisma/client";
import { prisma } from "./prisma";
import { isListable, type Product } from "./products";

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    quantity: row.quantity,
    description: row.description,
    image: row.image,
    imagePublicId: row.imagePublicId ?? undefined,
    featured: row.featured,
    soldOutAt: row.soldOutAt
      ? row.soldOutAt.toISOString().slice(0, 10)
      : undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });
  return rows.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? toProduct(row) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { featured: true },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });
  return rows.map(toProduct);
}

export async function getProductsByCategory(
  category: Product["category"],
  now: number,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });
  return rows.map(toProduct).filter((product) => isListable(product, now));
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { id: { in: ids } },
  });
  return rows.map(toProduct);
}
