import { z, ZodError } from 'zod';

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  // images: z.array(z.string().url('Invalid image URL')).optional().default([]),
});

export const validateProductForm = (formData: FormData) => {
  const parsedData = productSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    // images: formData.get('images'),
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};

export const validateProductId = (productId: string) => {
  const parsedProductId = z.string().min(1, 'Product ID is required').safeParse(productId);
  if (!parsedProductId.success) {
    throw new ZodError(parsedProductId.error.issues);
  }
  return parsedProductId;
};
