import { z, ZodError } from 'zod';
import { OrderStatus } from '@prisma/client';

const orderStatusSchema = z.object({
  orderId: z.string(),
  status: z.enum([OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.COMPLETED, OrderStatus.CANCELLED]),
});

export const orderSchema = z.object({
  userId: z.string(),
  total: z.coerce.number(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    }),
  ),
});

export const validateOrderForm = (formData: FormData) => {
  const parsedData = orderSchema.safeParse({
    userId: formData.get('userId'),
    total: formData.get('total'),
    items: [JSON.parse(formData.get('items') as string)],
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};

export const validateOrderStatus = (data: unknown) => {
  const parsedStatus = orderStatusSchema.safeParse(data);

  if (!parsedStatus.success) {
    throw new ZodError(parsedStatus.error.issues);
  }

  return parsedStatus;
};
