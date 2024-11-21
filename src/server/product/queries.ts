import 'server-only';

import { prisma } from '@/lib/prisma';

interface GetProductsParams {
  query?: string;
  categoryIds?: string[];
  sizeIds?: string[];
  colorIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export async function getProducts({
  query,
  categoryIds,
  sizeIds,
  colorIds,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
  orderBy = 'createdAt',
  orderDirection = 'desc',
}: GetProductsParams = {}) {
  const where = {
    ...(query && {
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
      ],
    }),
    ...(categoryIds?.length && { categoryId: { in: categoryIds } }),
    ...(sizeIds?.length && { sizes: { some: { id: { in: sizeIds } } } }),
    ...(colorIds?.length && { colors: { some: { id: { in: colorIds } } } }),
    ...(minPrice !== undefined && { price: { gte: minPrice } }),
    ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        colors: true,
        sizes: true,
      },
    }),
    prisma.product.count({
      where,
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
      colors: true,
      sizes: true,
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

export async function getMaxPrice() {
  const maxPrice = await prisma.product.findFirst({
    select: { price: true },
    orderBy: { price: 'desc' },
  });

  return maxPrice ? Number(maxPrice.price) : 0;
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      colors: true,
      sizes: true,
    },
    take: 10,
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return serializedProducts;
}
