import { z, ZodError } from 'zod';

const paginationQuerySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int('Page must be an integer').positive('Page must be greater than 0').default(1),
  limit: z.coerce
    .number()
    .int('Limit must be an integer')
    .positive('Limit must be greater than 0')
    .max(100, 'Limit cannot exceed 100')
    .default(10),
  orderBy: z.string().optional(),
  orderDirection: z.string().optional(),
});

export const validateProductQuery = (searchParams: URLSearchParams) => {
  const parsedData = paginationQuerySchema.safeParse({
    query: searchParams.get('query'),
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    orderBy: searchParams.get('orderBy'),
    orderDirection: searchParams.get('orderDirection'),
  });

  if (!parsedData.success) {
    throw new ZodError(parsedData.error.issues);
  }

  return parsedData;
};
