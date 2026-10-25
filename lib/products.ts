export type Product = {
	id: string;
	name: string;
	category: "Women" | "Men" | "Children";
	price: number;
	quantity: number;
	description: string;
	image: string;
	soldOutAt?: string;
	imagePublicId?: string;
	featured: boolean;
};

const products: Product[] = [
	{
		id: "linen-wrap-dress",
		name: "Linen Wrap Dress",
		category: "Women",
		price: 8900,
		quantity: 2,
		description:
			"A breathable linen wrap dress with a flattering tie waist, made for warm days and easy evenings.",
		image:
			"https://picsum.photos/seed/dress-1/600/800",
		featured: true,
	},
	{
		id: "classic-oxford-shirt",
		name: "Classic Oxford Shirt",
		category: "Men",
		price: 40000,
		quantity: 5,
		description:
			"A crisp cotton Oxford shirt with a tailored fit. Smart on its own, sharp under a jacket.",
		image:
			"https://picsum.photos/seed/shirt-2/600/800",
		featured: true,
	},
	{
		id: "leather-tote-bag",
		name: "Leather Tote Bag",
		category: "Children",
		price: 25000,
		quantity: 5,
		description:
			"A roomy tote in soft leather with sturdy handles, sized for everything you carry in a day.",
		image:
			"https://picsum.photos/seed/bag-3/500/800",
		featured: true,
	},
	{
		id: "pleated-midi-skirt",
		name: "Pleated Midi Skirt",
		category: "Women",
		price: 56451,
		quantity: 12,
		description:
			"A flowing pleated midi skirt that moves with you and pairs with almost any top.",
		image:
			"https://picsum.photos/seed/skirt-4/600/800",
		featured: true,
	},
	{
		id: "tailored-chinos",
		name: "Tailored Chinos",
		category: "Men",
		price: 8000,
		quantity: 6,
		description:
			"Slim-cut chinos in a comfortable stretch cotton, polished enough for the office.",
		image:
			"https://picsum.photos/seed/chinis-5/600/800",
		featured: true,
	},
	{
		id: "silk-scarf",
		name: "Silk Scarf",
		category: "Children",
		price: 28325,
		quantity: 2,
		description:
			"A lightweight silk scarf with a soft drape. Wear it at the neck, in the hair or on a bag.",
		image:
			"https://picsum.photos/seed/scarf-6/600/800",
		featured: true,
	},
	{
		id: "wide-leg-trousers",
		name: "Wide Leg Trouser",
		category: "Women",
		price: 52000,
		quantity: 4,
		description:
			"High-waisted wide leg trousers with a graceful drape and a relaxed, elegant line.",
		image:
			"https://picsum.photos/seed/trousers-7/600/800",
		featured: false,
	},
	{
		id: "blause",
		name: "Blause",
		category: "Women",
		price: 12000,
		quantity: 5,
		description:
			"A soft, easy-fitting blouse with a modern cut that works from desk to dinner.",
		image:
			"https://picsum.photos/seed/trousers-8/400/800",
		featured: false,
	},
	{
		id: "jacket",
		name: "Jacket",
		category: "Men",
		price: 35000,
		quantity: 2,
		description:
			"A structured jacket that finishes any outfit, with a clean silhouette and a comfortable lining.",
		image:
			"https://picsum.photos/seed/jacket-9/400/700",
		featured: false,
	},
	{
		id: "senator",
		name: "Senator",
		category: "Men",
		price: 45000,
		quantity: 6,
		description:
			"A classic senator outfit with clean lines and a distinguished finish for occasions and everyday wear.",
		image:
			"https://picsum.photos/seed/suit-10/700/700",
		featured: false,
	},
	{
		id: "skirt-blause",
		name: "Skirt & Blause",
		category: "Children",
		price: 17000,
		quantity: 2,
		description:
			"A cheerful matching skirt and blouse set, comfortable enough for school and special enough for parties.",
		image:
			"https://picsum.photos/seed/skirt-11/500/800",
		featured: false,
	},
	{
		id: "play-dress",
		name: "Play Dress",
		category: "Children",
		price: 12000,
		quantity: 4,
		description:
			"A soft, stretchy dress that stays comfortable through every game, climb and spin.",
		image:
			"https://picsum.photos/seed/play-dress-12/500/800",
		featured: false,
	},
];

export function getFeaturedProducts() {
	return products.filter(
		(product) => product.featured,
	);
}

const SOLD_OUT_VISIBLE_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function isListable(
	product: Product,
	now: number,
) {
	if (!isSoldOut(product)) return true;
	if (!product.soldOutAt) return true;

	const daysSoldOut =
		(now -
			new Date(product.soldOutAt).getTime()) /
		MS_PER_DAY;
	return daysSoldOut <= SOLD_OUT_VISIBLE_DAYS;
}

export function getProductsByCategory(
	category: Product["category"],
	now: number,
) {
	return products.filter(
		(product) =>
			product.category === category &&
			isListable(product, now),
	);
}

export function getAllProducts() {
	return products;
}

export function getProductById(id: string) {
	return products.find(
		(product) => product.id === id,
	);
}

export function isSoldOut(product: Product) {
	return product.quantity <= 0;
}
