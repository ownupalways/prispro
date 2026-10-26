"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import {
	getProductById,
	isSoldOut,
} from "@/lib/products";
import formatPrice from "@/lib/format";

export default function ProductDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const [message, setMessage] = useState("");
	const { items, addToCart } = useCart();

	const foundProduct = getProductById(id);

	if (!foundProduct) {
		notFound();
	}

	const product = foundProduct;

	const soldOut = isSoldOut(product);

	const cartItem = items.find(
		(item) => item.productId === product.id,
	);

	const cartQuantity = cartItem?.quantity ?? 0;
	const stockLimitReached =
		cartQuantity >= product.quantity;

	function handleAddToCart() {
		if (soldOut || stockLimitReached) {
			setMessage(
				"Maximum available quantity reached.",
			);
			return;
		}

		addToCart(product);
		setMessage("Added to cart!");
	}

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
						type="button"
						disabled={
							soldOut || stockLimitReached
						}
						onClick={handleAddToCart}
						className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start">
						{soldOut
							? "Sold out"
							: stockLimitReached
								? "Maximum quantity added"
								: "Add to cart"}
					</button>

					{message && (
						<p
							role="status"
							aria-live="polite"
							className="mt-3 text-sm text-muted">
							{message}
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export function ProductDetailsSkeleton() {
	return (
		<div className="grid animate-pulse gap-10 md:grid-cols-2">
			<div className="aspect-3/4 rounded-2xl bg-surface" />

			<div className="flex flex-col gap-4 py-8">
				<div className="h-4 w-24 rounded bg-surface" />
				<div className="h-8 w-3/4 rounded bg-surface" />
				<div className="h-6 w-32 rounded bg-surface" />
				<div className="h-20 rounded bg-surface" />
			</div>
		</div>
	);
}
