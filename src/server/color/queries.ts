import 'server-only';

import { prisma } from '@/lib/prisma';

export async function getColors({
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
    return await getAllColors();
  }

  const [colors, total] = await Promise.all([
    prisma.color.findMany({
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
    prisma.color.count({
      ...(query && {
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
      }),
    }),
  ]);

  return {
    items: colors,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit,
  };
}

export async function getAllColors() {
  return prisma.color.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getColor(id: string) {
  return prisma.color.findUnique({
    where: { id },
  });
}
