import 'server-only';
import { prisma } from '@/lib/prisma';

export async function getOrders({
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
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      ...(query && {
        where: {
          OR: [
            { user: { name: { contains: query, mode: 'insensitive' } } },
            { user: { email: { contains: query, mode: 'insensitive' } } },
            { id: { contains: query } },
          ],
        },
      }),
      include: {
        user: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      ...(orderBy && {
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({
      ...(query && {
        where: {
          OR: [
            { user: { name: { contains: query, mode: 'insensitive' } } },
            { user: { email: { contains: query, mode: 'insensitive' } } },
            { id: { contains: query } },
          ],
        },
      }),
    }),
  ]);

  const serializedOrders = orders.map((order) => ({
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  }));

  return {
    items: serializedOrders,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    pageSize: limit,
  };
}

export async function getUserOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedOrders = orders.map((order) => ({
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    })),
  }));

  return serializedOrders;
}

export async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return null;

  return {
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  };
}
