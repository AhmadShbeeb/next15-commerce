'use server';
import 'server-only';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { validateProductForm, validateProductId } from './validations';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { checkAuthorization } from '../common/check-authorization';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function upsertProduct(previousState: unknown, formData: FormData) {
  try {
    await checkAuthorization();
    const { data: parsedFormData } = validateProductForm(formData);
    console.log('🚀 ~ upsertProduct ~ parsedFormData:', parsedFormData);

    await prisma.product.upsert({
      where: {
        id: parsedFormData.id || '',
      },
      create: {
        name: parsedFormData.name,
        description: parsedFormData.description,
        price: parsedFormData.price,
        categoryId: parsedFormData.categoryId,
        quantity: parsedFormData.quantity,
        // images: parsedFormData.images,
        colors: parsedFormData.colorIds
          ? {
              connect: parsedFormData.colorIds.map((colorId) => ({ id: colorId })),
            }
          : undefined,
        sizes: parsedFormData.sizeIds
          ? {
              connect: parsedFormData.sizeIds.map((sizeId) => ({ id: sizeId })),
            }
          : undefined,
      },
      update: {
        name: parsedFormData.name,
        description: parsedFormData.description,
        price: parsedFormData.price,
        categoryId: parsedFormData.categoryId,
        quantity: parsedFormData.quantity,
        colors: {
          set: [], // First disconnect all existing connections
          ...(parsedFormData.colorIds
            ? {
                connect: parsedFormData.colorIds.map((colorId) => ({ id: colorId })),
              }
            : undefined),
        },
        sizes: {
          set: [], // First disconnect all existing connections
          ...(parsedFormData.sizeIds
            ? {
                connect: parsedFormData.sizeIds.map((sizeId) => ({ id: sizeId })),
              }
            : undefined),
        },
      },
    });
  } catch (error) {
    console.error('Update product error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: { error: ['Failed to update product'] } };
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(prevState: unknown, productId: string) {
  await checkAuthorization();
  const { data: parsedProductId } = validateProductId(productId);

  try {
    await prisma.product.delete({
      where: { id: parsedProductId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete product error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return { success: false, error: { error: ['can not delete product with pending orders'] } };
      }
    }
    return { success: false, error: { error: ['Failed to delete product'] } };
  }
}
