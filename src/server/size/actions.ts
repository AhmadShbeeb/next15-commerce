'use server';
import 'server-only';

import { prisma } from '@/lib/prisma';
import { validateSizeForm, validateSizeId } from './validations';
import { ZodError } from 'zod';
import { checkAuthorization } from '../common/check-authorization';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function upsertSize(previousState: unknown, formData: FormData) {
  try {
    await checkAuthorization();
    const { data: parsedFormData } = validateSizeForm(formData);

    await prisma.size.upsert({
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
    console.error('Upsert size error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: { error: ['Failed to upsert size'] } };
  }
}

export async function deleteSize(prevState: unknown, sizeId: string) {
  try {
    await checkAuthorization();
    const { data: parsedSizeId } = validateSizeId(sizeId);

    await prisma.size.delete({
      where: { id: parsedSizeId },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete size error:', JSON.stringify(error, null, 2));
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return { success: false, error: { error: ['Cannot delete size with existing products'] } };
      }
    }
    return { success: false, error: { error: ['Failed to delete size'] } };
  }
}
