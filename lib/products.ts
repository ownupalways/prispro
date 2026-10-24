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
		name: "Classic Oxford Shirt",
		category: "Men",
		price: 40000,
		image:
			"https://picsum.photos/seed/shirt-2/600/800",
		featured: true,
	},
	{
		id: "leather-tote-bag",
		name: "Leather Tote Bag",
		category: "Children",
		price: 25000,
		image:
			"https://picsum.photos/seed/bag-3/500/800",
		featured: true,
	},
	{
		id: "pleated-midi-skirt",
		name: "Pleated Midi Skirt",
		category: "Women",
		price: 56451,
		image:
			"https://picsum.photos/seed/skirt-4/600/800",
		featured: true,
	},
	{
		id: "tailored-chinos",
		name: "Tailored Chinos",
		category: "Men",
		price: 8000,
		image:
			"https://picsum.photos/seed/chinis-5/600/800",
		featured: true,
	},
	{
		id: "silk-scarf",
		name: "Silk Scarf",
		category: "Children",
		price: 28325,
		image:
			"https://picsum.photos/seed/scarf-6/600/800",
		featured: true,
	},
	{
		id: "wide-leg-trousers",
		name: "Wide Leg Trouser",
		category: "Women",
		price: 52000,
		image:
			"https://picsum.photos/seed/trousers-7/600/800",
		featured: false,
	},
	{
		id: "blause",
		name: "Blause",
		category: "Women",
		price: 12000,
		image:
			"https://picsum.photos/seed/trousers-8/400/800",
		featured: false,
	},
	{
		id: "jacket",
		name: "Jacket",
		category: "Men",
		price: 35000,
		image:
			"https://picsum.photos/seed/jacket-9/400/700",
		featured: false,
	},
	{
		id: "senator",
		name: "Senator",
		category: "Men",
		price: 45000,
		image:
			"https://picsum.photos/seed/suit-10/700/700",
		featured: false,
	},
	{
		id: "skirt-blause",
		name: "Skirt & Blause",
		category: "Children",
		price: 17000,
		image:
			"https://picsum.photos/seed/skirt-11/500/800",
		featured: false,
	},
	{
		id: "play-dress",
		name: "Play Dress",
		category: "Children",
		price: 12000,
		image:
			"https://picsum.photos/seed/play-dress-12/500/800",
		featured: false,
	},
];


export function getFeaturedProducts() {
    return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: Product["category"]) {
	return products.filter((product) => product.category === category)
}
