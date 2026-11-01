import { connection } from "next/server";
import ProductGrid from "./ProductGrid";
import type { Product } from "@/lib/products";
import { getProductsByCategory } from "@/lib/product-queries";
import { getCurrentTime } from "@/lib/time";

export default async function CategoryProducts({
  title,
  category,
}: {
  title: string;
  category: Product["category"];
}) {
  await connection();
  const products = await getProductsByCategory(category, getCurrentTime());

  return <ProductGrid title={title} products={products} />;
}
