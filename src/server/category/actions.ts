'use server';
import 'server-only';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { validateCategoryForm, validateCategoryId } from './validations';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { checkAuthorization } from '../common/check-authorization';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function upsertCategory(previousState: unknown, formData: FormData) {
  try {
    await checkAuthorization();
    const { data: parsedFormData } = validateCategoryForm(formData);

    await prisma.category.upsert({
      where: { id: parsedFormData.id },
      update: {
        name: parsedFormData.name,
      },
      create: {
        name: parsedFormData.name,
      },
    });
  } catch (error) {
    console.error('Update category error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: { error: ['Failed to update category'] } };
  }

  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(prevState: unknown, categoryId: string) {
  await checkAuthorization();
  const { data: parsedCategoryId } = validateCategoryId(categoryId);

  try {
    await prisma.category.delete({
      where: { id: parsedCategoryId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete category error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return { success: false, error: { error: ['Cannot delete category with existing products'] } };
      }
    }
    return { success: false, error: { error: ['Failed to delete category'] } };
  }
}
