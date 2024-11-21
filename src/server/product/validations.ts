import { z, ZodError } from 'zod';

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
  quantity: z.coerce.number().min(0, 'Quantity must be 0 or greater'),
  colorIds: z.string().transform((str) => (str ? str.split(',') : [])),
  sizeIds: z.string().transform((str) => (str ? str.split(',') : [])),
  isFeatured: z.coerce.boolean(),
  images: z
    .string()
    .url('Must be a valid URL')
    .transform((url) => [url])
    .optional(),
});

export const validateProductForm = (formData: FormData) => {
  const parsedData = productSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryId: formData.get('categoryId'),
    colorIds: formData.get('colorIds'),
    sizeIds: formData.get('sizeIds'),
    quantity: formData.get('quantity'),
    isFeatured: formData.get('isFeatured') === 'on',
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
