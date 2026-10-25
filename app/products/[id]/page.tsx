import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ProductDetails, {
	ProductDetailsSkeleton,
} from "./ProductDetails";

export function generateStaticParams() {
	return getAllProducts().map((product) => ({
		id: product.id,
	}));
}

export default function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<Suspense
				fallback={<ProductDetailsSkeleton />}>
				<ProductDetails params={params} />
			</Suspense>
		</section>
	);
}
