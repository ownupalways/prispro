import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function WomenPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton title="Women's Affairs" />}>
      <CategoryProducts title="Women's Affairs" category="Women" />
    </Suspense>
  );
}
