import 'server-only';

import { prisma } from '@/lib/prisma';

export async function getProducts({
  query,
  page = 1,
  limit = 10,
  orderBy,
  orderDirection,
}: {
  query?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: string;
} = {}) {
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
      ...(query && {
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
      ...(orderBy && {
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({
      ...(query && {
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    }),
  ]);

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return {
    items: serializedProducts,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit,
  };
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  const serializedProduct = product
    ? {
        ...product,
        price: Number(product.price),
      }
    : undefined;

  return serializedProduct;
}
