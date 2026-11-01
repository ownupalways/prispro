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

const SOLD_OUT_VISIBLE_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function isSoldOut(product: Product) {
  return product.quantity <= 0;
}

export function isListable(product: Product, now: number) {
  if (!isSoldOut(product)) return true;
  if (!product.soldOutAt) return true;

  const daysSoldOut =
    (now - new Date(product.soldOutAt).getTime()) / MS_PER_DAY;
  return daysSoldOut <= SOLD_OUT_VISIBLE_DAYS;
}
