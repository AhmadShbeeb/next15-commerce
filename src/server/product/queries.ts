import 'server-only';

import { prisma } from '@/lib/prisma';

export async function getProducts({ query }: { query?: string } = {}) {
  const products = await prisma.product.findMany({
    ...(query && {
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    }),
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedProducts = products.map(product => ({
    ...product,
    price: Number(product.price),
  }));

  return serializedProducts;
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  const serializedProduct = product
    ? {
        ...product,
        price: Number(product.price),
      }
    : undefined;

  return serializedProduct;
}
