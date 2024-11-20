import { z, ZodError } from 'zod';

const colorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
});

export const validateColorForm = (formData: FormData) => {
  const parsedData = colorSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};

export const validateColorId = (colorId: string) => {
  const parsedColorId = z.string().min(1, 'Color ID is required').safeParse(colorId);
  if (!parsedColorId.success) {
    throw new ZodError(parsedColorId.error.issues);
  }
  return parsedColorId;
};
