import { checkAuthorization } from '@/server/common/check-authorization';
import { validatePaginationQuery } from '@/server/common/pagination-validation';
import { getCategories } from '@/server/category/queries';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    await checkAuthorization();

    const { data: validatedQuery } = validatePaginationQuery(request.nextUrl.searchParams);
    const categories = await getCategories({
      query: validatedQuery.query,
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      orderBy: validatedQuery.orderBy,
      orderDirection: validatedQuery.orderDirection,
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories API Error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
