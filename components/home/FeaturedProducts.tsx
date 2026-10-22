import Link from "next/link";
import ProductCard from "../ProductCard";
import { getFeaturedProducts } from "@/lib/products";


export default function FeaturedProduct() {
    const products = getFeaturedProducts()


    return (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
                <h2 className="text-2xl font-bold sm:text">
                    Featured Products
                </h2>
                <Link
                    href="/new"
                    className="text-sm font-medium text-primary hover:underline">
                    View all
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
