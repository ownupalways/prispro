import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import AddToCartButton from "@/components/product/AddToCartButton";
import { getProductById } from "@/lib/product-queries";
import { isSoldOut } from "@/lib/products";
import formatPrice from "@/lib/format";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const soldOut = isSoldOut(product);

  return (
    <>
      <Link
        href={`/${product.category.toLowerCase()}`}
        className="text-sm font-medium text-primary hover:underline">
        ← Back to {product.category}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>

          {soldOut && (
            <span className="mt-3 inline-block self-start rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
              Sold out
            </span>
          )}

          <p className="mt-6 leading-7 text-muted">{product.description}</p>

          <AddToCartButton product={product} soldOut={soldOut} />
        </div>
      </div>
    </>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 md:grid-cols-2">
      <div className="aspect-3/4 rounded-2xl bg-surface" />

      <div className="flex flex-col gap-4 py-8">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="h-8 w-3/4 rounded bg-surface" />
        <div className="h-6 w-32 rounded bg-surface" />
        <div className="h-20 rounded bg-surface" />
      </div>
    </div>
  );
}
