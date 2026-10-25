import Image from "next/image";
import Link from "next/link";
import {
	isSoldOut,
	type Product,
} from "@/lib/products";
import  formatPrice  from "../lib/format";



export default function ProductCard({ product }: { product: Product }) {

    const soldOut = isSoldOut(product)

    return (
			<article className="group">
				<Link
					href={`/products/${product.id}`}
					className="block">
					<div className="relative aspect-3/4 overflow-hidden rounded-xl bg-surface">
						<Image
							src={product.image}
							alt={product.name}
							fill
							sizes="(min-width: 768px) 25vw, 50vw"
							className={`object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? "opacity-50 grayscale" : ""}`}
						/>
						{soldOut && (
							<span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
								Sold out
							</span>
						)}
					</div>
					<p className="mt-3 text-xs uppercase tracking-wide text-muted">
						{product.category}
					</p>
					<h3 className="mt-1 font-semibold">
						{product.name}
					</h3>
					<p className="mt-1 fontsemibold text-primary">
						{formatPrice(product.price)}
					</p>
				</Link>

				<button
					disabled={soldOut}
					className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
					{soldOut ? "Sold out" : "Add to cart"}
				</button>
			</article>
		);
}
