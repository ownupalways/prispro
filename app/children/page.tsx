import ProductGrid from "@/components/ProductGrid"
import { getProductsByCategory } from "@/lib/products";




export default function WomenPage() {

    return (
			<ProductGrid 
			title= "Children's wears"
			products= {getProductsByCategory("Children")}
			/>
		);
}
