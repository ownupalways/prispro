import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";
import formatPrice  from "@/lib/format";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link
        href={`/${product.category.toLowerCase()}`}
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to {product.category}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-7 text-muted">{product.description}</p>

          <button className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:self-start">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
