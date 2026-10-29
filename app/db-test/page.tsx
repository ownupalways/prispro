import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

async function ProductionCount() {
  await connection();
  const count = await prisma.product.count();
  return <p className="p-8">Products in database: {count}</p>;
}


export default function DbTest() {
return (
	<Suspense
		fallback={<p className="p-8">Loading...</p>}>
		<ProductionCount />
	</Suspense>
);
}
