import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProduct from "@/components/home/FeaturedProducts";

export default function Home() {
	return (
		<>
			<Hero />
			<Categories />
			<FeaturedProduct />
		</>
	);
}
