import { Order, OrderItem, Prisma } from '@prisma/client';

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true; colors: true; sizes: true };
}>;

export type SerializedProduct = Omit<ProductWithCategory, 'price'> & {
  price: number;
};

export type SerializedProductPaginated = {
  items: SerializedProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type SerializedOrderItem = Omit<OrderItem, 'price'> & {
  price: number;
  product: {
    name: string;
  };
};

export type SerializedOrder = Omit<Order, 'total'> & {
  total: number;
  items: SerializedOrderItem[];
};

export type SerializedOrderPaginated = {
  items: SerializedOrder[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type SerializedCategory = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedCategoryPaginated = {
  items: SerializedCategory[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type SerializedColor = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedColorPaginated = {
  items: SerializedColor[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type SerializedSize = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
