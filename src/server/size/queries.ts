import 'server-only';

import { prisma } from '@/lib/prisma';

export async function getSizes({
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
    return await getAllSizes();
  }

  const [sizes, total] = await Promise.all([
    prisma.size.findMany({
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
    prisma.size.count({
      ...(query && {
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
      }),
    }),
  ]);

  return {
    items: sizes,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit,
  };
}

export async function getAllSizes() {
  return prisma.size.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getSize(id: string) {
  return prisma.size.findUnique({
    where: { id },
  });
}
