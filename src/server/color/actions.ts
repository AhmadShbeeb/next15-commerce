'use server';
import 'server-only';

import { prisma } from '@/lib/prisma';
import { validateColorForm, validateColorId } from './validations';
import { ZodError } from 'zod';
import { checkAuthorization } from '../common/check-authorization';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function upsertColor(previousState: unknown, formData: FormData) {
  try {
    await checkAuthorization();
    const { data: parsedFormData } = validateColorForm(formData);

    await prisma.color.upsert({
      where: { id: parsedFormData.id },
      update: {
        name: parsedFormData.name,
      },
      create: {
        name: parsedFormData.name,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Upsert color error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: { error: ['Failed to upsert color'] } };
  }
}

export async function deleteColor(prevState: unknown, colorId: string) {
  await checkAuthorization();
  const { data: parsedColorId } = validateColorId(colorId);

  try {
    await prisma.color.delete({
      where: { id: parsedColorId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete color error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return { success: false, error: { error: ['Cannot delete color with existing products'] } };
      }
    }
    return { success: false, error: { error: ['Failed to delete color'] } };
  }
}
