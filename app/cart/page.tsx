"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { getProductById } from "@/lib/products";
import formatPrice from "@/lib/format";

export default function CartPage() {
	const {
		items,
		removeFromCart,
		updateQuantity,
	} = useCart();

	const cartItems = items.flatMap((item) => {
		const product = getProductById(
			item.productId,
		);

		return product ? [{ ...item, product }] : [];
	});

	const subtotal = cartItems.reduce(
		(total, item) =>
			total + item.product.price * item.quantity,
		0,
	);

	if (cartItems.length === 0) {
		return (
			<section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
				<h1 className="text-3xl font-bold">
					Your Shopping Bag
				</h1>
				<p className="mt-4 text-muted">
					Your cart is empty. Discover something
					you love.
				</p>
				<Link
					href="/"
					className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
					Continue Shopping
				</Link>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
			<h1 className="text-3xl font-bold">
				Your Shopping Bag
			</h1>

			<ul className="mt-8 divide-y divide-border">
				{cartItems.map(
					({ product, quantity }) => (
						<li
							key={product.id}
							className="flex gap-4 py-6 sm:gap-6">
							<div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-surface sm:h-40 sm:w-32">
								<Image
									src={product.image}
									alt={product.name}
									fill
									sizes="128px"
									className="object-cover"
								/>
							</div>

							<div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
								<div>
									<p className="text-xs uppercase tracking-wide text-muted">
										{product.category}
									</p>
									<h2 className="mt-1 font-semibold">
										{product.name}
									</h2>
									<p className="mt-2 font-medium text-primary">
										{formatPrice(product.price)}
									</p>

									<button
										type="button"
										onClick={() =>
											removeFromCart(product.id)
										}
										className="mt-3 text-sm text-muted underline hover:text-foreground">
										Remove
									</button>
								</div>

								<div className="flex items-center gap-3">
									<label
										htmlFor={`quantity-${product.id}`}
										className="text-sm text-muted">
										Qty
									</label>

									<select
										id={`quantity-${product.id}`}
										value={quantity}
										onChange={(event) =>
											updateQuantity(
												product.id,
												Number(
													event.target.value,
												),
											)
										}
										className="rounded-md border border-border bg-background px-3 py-2">
										{Array.from(
											{
												length: Math.max(
													1,
													Math.min(
														product.quantity,
														99,
													),
												),
											},
											(_, index) => index + 1,
										).map((qty) => (
											<option
												key={qty}
												value={qty}>
												{qty}
											</option>
										))}
									</select>
								</div>
							</div>
						</li>
					),
				)}
			</ul>

			<div className="mt-8 border-t border-border pt-6 text-right">
				<p className="text-sm text-muted">
					Subtotal
				</p>
				<p className="mt-1 text-2xl font-bold">
					{formatPrice(subtotal)}
				</p>
				<p className="mt-2 text-sm text-muted">
					Shipping and payment will be handled at
					checkout.
				</p>

				<button
					type="button"
					disabled
					className="mt-6 cursor-not-allowed rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground opacity-50">
					Checkout — Coming Soon
				</button>

				<div>
					<Link
						href="/"
						className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
						Continue Shopping
					</Link>
				</div>
			</div>
		</section>
	);
}
