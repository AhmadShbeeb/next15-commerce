import 'server-only';
import { prisma } from '@/lib/prisma';

export async function getOrders() {
  const orders = await prisma.order.findMany({
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  const serializedOrders = orders.map(order => ({
    ...order,
    total: Number(order.total),
    items: order.items.map(item => ({
      ...item,
      price: Number(item.price),
    })),
  }));

  return serializedOrders;
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

  const serializedOrders = orders.map(order => ({
    ...order,
    total: Number(order.total),
    items: order.items.map(item => ({
      ...item,
      price: Number(item.price),
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
    items: order.items.map(item => ({
      ...item,
      price: Number(item.price),
    })),
  };
}
