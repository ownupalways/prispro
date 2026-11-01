import "server-only";
import { prisma } from "./prisma";

export async function getOrderByReference(reference: string) {
  return prisma.order.findUnique({
    where: { reference },
    select: {
      reference: true,
      status: true,
      total: true,
      city: true,
      state: true,
      items: {
        select: { id: true, name: true, price: true, quantity: true },
      },
    },
  });
}
