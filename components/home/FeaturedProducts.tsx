import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import ProductCard from "../ProductCard";
import { getFeaturedProducts } from "@/lib/product-queries";

const GRID_CLASSES = "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4";

async function FeaturedGrid() {
  await connection();
  const products = await getFeaturedProducts();

  return (
    <div className={GRID_CLASSES}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function FeaturedGridSkeleton() {
  return (
    <div className={GRID_CLASSES}>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="shimmer aspect-3/4 rounded-lg" />
      ))}
    </div>
  );
}

export default function FeaturedProduct() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">Featured Products</h2>
        <Link
          href="/new"
          className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      <Suspense fallback={<FeaturedGridSkeleton />}>
        <FeaturedGrid />
      </Suspense>
    </section>
  );
}
