import { z, ZodError } from 'zod';

const sizeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
});

export const validateSizeForm = (formData: FormData) => {
  const parsedData = sizeSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};

export const validateSizeId = (sizeId: string) => {
  const parsedSizeId = z.string().min(1, 'Size ID is required').safeParse(sizeId);
  if (!parsedSizeId.success) {
    throw new ZodError(parsedSizeId.error.issues);
  }
  return parsedSizeId;
};
