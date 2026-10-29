import { prisma } from "../lib/prisma";
import { getAllProducts } from "./seed-data";

async function main() {
  const products = getAllProducts();

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        quantity: p.quantity,
        description: p.description,
        image: p.image,
        imagePublicId: p.imagePublicId ?? null,
        featured: p.featured,
        soldOutAt: p.soldOutAt ? new Date(p.soldOutAt) : null,
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
