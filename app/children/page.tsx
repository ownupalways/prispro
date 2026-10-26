import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function ChildrenPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CategoryProducts title="Children's Collection" category="Children" />
    </Suspense>
  );
}
