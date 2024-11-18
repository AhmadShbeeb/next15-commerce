import { Product, Order, OrderItem, User } from '@prisma/client';

export type SerializedProduct = Omit<Product, 'price'> & {
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
  user: User;
};

export type SerializedOrderPaginated = {
  items: SerializedOrder[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
