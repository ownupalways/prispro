import ProductGrid from "@/components/ProductGrid"
import { getProductsByCategory } from "@/lib/products";




export default function WomenPage() {

    return (
            <ProductGrid 
            title= "Men's Collection"
            products= {getProductsByCategory("Men")}
            />
        );
}
