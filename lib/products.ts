export type Product = {
    id: string;
    name: string;
    category: "Women" | "Men" | "Children";
    price: number;
    image: string;
    imagePublicId?: string;
    featured: boolean;
};

const products: Product[] = [
	{
		id: "linen-wrap-dress",
		name: "Linen Wrap Dress",
		category: "Women",
		price: 8900,
		image:
			"https://picsum.photos/seed/dress-1/600/800",
		featured: true,
	},
	{
		id: "classic-oxford-shirt",
		name: "Classic-Oxford-Shirt",
		category: "Men",
		price: 40000,
		image:
			"https://picsum.photos/seed/shirt-2/600/800",
		featured: true,
	},
	{
		id: "leather-tote-bag",
		name: "Leather-Tote-Bag",
		category: "Children",
		price: 25000,
		image:
			"https://picsum.photos/seed/bag-3/600/800",
		featured: true,
	},
	{
		id: "pleated-midi-skirt",
		name: "Pleated-Midi-Skirt",
		category: "Women",
		price: 56451,
		image:
			"https://picsum.photos/seed/skirt-4/600/800",
		featured: true,
	},
	{
		id: "tailored-chinos",
		name: "Tailored-Chinos",
		category: "Men",
		price: 80,
		image:
			"https://picsum.photos/seed/chinis-5/600/800",
		featured: true,
	},
	{
		id: "silk-scarf",
		name: "Silk-Scarf",
		category: "Children",
		price: 28325,
		image:
			"https://picsum.photos/seed/scarf-6/600/800",
		featured: false,
	},
];


export function getFeaturedProducts() {
    return products.filter((product) => product.featured)
}
