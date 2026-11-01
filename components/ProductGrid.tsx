import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

const SECTION_CLASSES = "mx-auto max-w-7xl px-4 py-12 sm:px-6";
const TITLE_CLASSES = "mb-8 text-2xl sm:text-3xl";
const GRID_CLASSES =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

type ProductGridProps = {
  title: string;
  products: Product[];
};

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>{title}</h2>

      <div className={GRID_CLASSES}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function ProductGridSkeleton({ title }: { title?: string }) {
  return (
    <section
      className={SECTION_CLASSES}
      aria-busy="true"
      aria-label="Loading products">
      {title ? (
        <h2 className={TITLE_CLASSES}>{title}</h2>
      ) : (
        <div className="shimmer mb-8 h-8 w-48 rounded" />
      )}

      <div className={GRID_CLASSES}>
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <div className="shimmer aspect-3/4 rounded-xl" />
            <div className="shimmer mt-3 h-3 w-16 rounded" />
            <div className="shimmer mt-2 h-4 w-3/4 rounded" />
            <div className="shimmer mt-2 h-4 w-1/3 rounded" />
            <div className="shimmer mt-3 h-10 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
