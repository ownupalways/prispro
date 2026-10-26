import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function WomenPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CategoryProducts title="Women's Affairs" category="Women" />
    </Suspense>
  );
}
