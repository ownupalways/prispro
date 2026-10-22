import Link from "next/link";
import CategoryCard from "./CategoryCard";

const categories = [
	{
		name: "Women",
		href: "/women",
		blurb: "Dresses, tops & more",
		description:
			"Redefine elegance with stunning designs that celebrate your femininity, confidence, and individuality. From everyday chic to breathtaking glamour, dress beautifully for every moment.",
		image:
			"https://picsum.photos/seed/women-fashion/800/1000",
	},
	{
		name: "Men",
		href: "/men",
		blurb: "Shirts, trousers & more",
		description:
			"Command attention without saying a word. Discover refined styles that blend masculine confidence, impeccable tailoring, and timeless sophistication for the modern gentleman.",
		image:
			"https://picsum.photos/seed/men-fashion/800/1000",
	},
	{
		name: "Children",
		href: "/children",
		blurb: "natives, readymade & smartwear",
		description:
			"Little personalities deserve big style! Explore adorable, comfortable, and playful outfits that keep your little ones looking charming through every adventure.",
		image:
			"https://picsum.photos/seed/children-fashion/800/1000",
	},
];

export default function Categories() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
			<div className="mb-8 flex items-end justify-between">
				<h2 className="text-2xl font-bold sm:text-3xl">
					Shop by category
				</h2>
				<Link
					href="/women"
					className="text-sm font-medium text-primary hover:underline">
					View all
				</Link>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((cat) => (
					<CategoryCard
						key={cat.href}
						name={cat.name}
                        href={cat.href}
						description={cat.description} blurb={cat.blurb}
						image={cat.image}
					/>
				))}
			</div>
		</section>
	);
}
