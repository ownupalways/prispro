import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function ChildrenPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton title="Children's Collection" />}>
      <CategoryProducts title="Children's Collection" category="Children" />
    </Suspense>
  );
}
