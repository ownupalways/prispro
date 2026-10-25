import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	getProductById,
	isSoldOut,
} from "@/lib/products";
import  formatPrice  from "@/lib/format";

export default async function ProductDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = getProductById(id);

	if (!product) {
		notFound();
	}

    const soldOut = isSoldOut(product);

	return (
		<>
			<Link
				href={`/${product.category.toLowerCase()}`}
				className="text-sm font-medium text-primary hover:underline">
				← Back to {product.category}
			</Link>

			<div className="mt-6 grid gap-10 md:grid-cols-2">
				<div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-surface">
					<Image
						src={product.image}
						alt={product.name}
						fill
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover"
					/>
				</div>

				<div className="flex flex-col justify-center">
					<p className="text-xs uppercase tracking-wide text-muted">
						{product.category}
					</p>
					<h1 className="mt-2 text-3xl font-bold sm:text-4xl">
						{product.name}
					</h1>
					<p className="mt-4 text-2xl font-semibold text-primary">
						{formatPrice(product.price)}
					</p>
					{soldOut && (
						<span className="mt-3 inline-block self-start rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
							Sold out
						</span>
					)}
					<p className="mt-6 leading-7 text-muted">
						{product.description}
					</p>

					<button
						disabled={soldOut}
						className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start">
						{soldOut ? "Sold out" : "Add to cart"}
					</button>
				</div>
			</div>
		</>
	);
}

export function ProductDetailsSkeleton() {
	return (
		<div>
			<div className="shimmer h-5 w-32 rounded" />

			<div className="mt-6 grid gap-10 md:grid-cols-2">
				<div className="shimmer aspect-3/4 rounded-2xl" />

				<div className="flex flex-col justify-center gap-4">
					<div className="shimmer h-3 w-20 rounded" />
					<div className="shimmer h-9 w-3/4 rounded" />
					<div className="shimmer h-7 w-32 rounded" />
					<div className="shimmer h-24 w-full rounded" />
				</div>
			</div>
		</div>
	);
}
