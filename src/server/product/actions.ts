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

    await prisma.product.upsert({
      where: { id: parsedFormData.id },
      update: {
        name: parsedFormData.name,
        description: parsedFormData.description,
        price: parsedFormData.price,
        categoryId: parsedFormData.categoryId,
        colorId: parsedFormData.colorId,
        sizeId: parsedFormData.sizeId,
        quantity: parsedFormData.quantity,
        // images: parsedFormData.images,
      },
      create: {
        name: parsedFormData.name,
        description: parsedFormData.description,
        price: parsedFormData.price,
        categoryId: parsedFormData.categoryId,
        colorId: parsedFormData.colorId,
        sizeId: parsedFormData.sizeId,
        quantity: parsedFormData.quantity,
        // images: parsedFormData.images,
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
