import { z, ZodError } from 'zod';

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
});

export const validateCategoryForm = (formData: FormData) => {
  const parsedData = categorySchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};

export const validateCategoryId = (categoryId: string) => {
  const parsedCategoryId = z.string().min(1, 'Category ID is required').safeParse(categoryId);
  if (!parsedCategoryId.success) {
    throw new ZodError(parsedCategoryId.error.issues);
  }
  return parsedCategoryId;
};
