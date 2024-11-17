import { checkAuthorization } from '@/server/common/check-authorization';
import { validateProductQuery } from '@/server/common/pagination-validation';
import { getProducts } from '@/server/product/queries';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    await checkAuthorization();
    const { data: validatedQuery } = validateProductQuery(request.nextUrl.searchParams);

    const products = await getProducts({
      query: validatedQuery.query,
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      orderBy: validatedQuery.orderBy,
      orderDirection: validatedQuery.orderDirection,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API Error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
