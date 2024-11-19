import 'server-only';

import { prisma } from '@/lib/prisma';

export async function getCategories({
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
  if (limit === -1) {
    return await getAllCategories();
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      ...(query && {
        where: {
          name: { contains: query, mode: 'insensitive' },
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
    prisma.category.count({
      ...(query && {
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
      }),
    }),
  ]);

  return {
    items: categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit,
  };
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getCategory(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}
