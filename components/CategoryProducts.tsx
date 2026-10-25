import { connection } from "next/server";
import ProductGrid from "./ProductGrid";
import { getProductsByCategory, type Product } from "@/lib/products";
import { getCurrentTime } from "@/lib/time";

export default async function CategoryProducts({
  title,
  category,
}: {
  title: string;
  category: Product["category"];
}) {
  await connection();
  const products = getProductsByCategory(category, getCurrentTime());

  return <ProductGrid title={title} products={products} />;
}
