import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import  { ProductGridSkeleton }  from "@/components/ProductGrid";

export default function MenPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton title="Men's Collection" />}>
      <CategoryProducts title="Men's Collection" category="Men" />
    </Suspense>
  );
}
