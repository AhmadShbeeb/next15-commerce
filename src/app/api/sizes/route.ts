import { checkAuthorization } from '@/server/common/check-authorization';
import { validatePaginationQuery } from '@/server/common/pagination-validation';
import { getSizes } from '@/server/size/queries';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    await checkAuthorization();

    const { data: validatedQuery } = validatePaginationQuery(request.nextUrl.searchParams);
    const sizes = await getSizes({
      query: validatedQuery.query,
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      orderBy: validatedQuery.orderBy,
      orderDirection: validatedQuery.orderDirection,
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error('Sizes API Error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch sizes' }, { status: 500 });
  }
}
