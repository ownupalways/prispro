import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";


type ProductGridProps = {
    title: string;
    products: Product[]
}


export default function ProductGrid({
    title, products
}: ProductGridProps) {

    return (
        <section className="mx-auto max-w-7xl sm:px-6 py-12">
            <h2 className="mb-8 text-2xl sm:text-3xl">
                {title}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg-grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
