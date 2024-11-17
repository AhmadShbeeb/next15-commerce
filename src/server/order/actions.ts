'use server';
import 'server-only';

import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { checkAuthorization } from '../common/check-authorization';
import { validateOrderForm, validateOrderStatus } from './validations';

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    await checkAuthorization();
    const { data: validatedStatus } = validateOrderStatus(status);

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: validatedStatus },
    });

    revalidatePath('/admin/orders');
    return { success: true, data: order };
  } catch (error) {
    console.error('Update order status error:', error);
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: { error: ['Failed to update order status'] } };
  }
}

export async function createOrder(prevState: unknown, formData: FormData) {
  try {
    await checkAuthorization();

    const { data: parsedOrder } = validateOrderForm(formData);

    const order = await prisma.order.create({
      data: {
        userId: parsedOrder.userId,
        total: parsedOrder.total,
        items: {
          create: parsedOrder.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { success: true, data: order.id };
  } catch (error) {
    console.error('Create order error:', error);
    return { success: false, error: { error: ['Failed to create order'] } };
  }
}
