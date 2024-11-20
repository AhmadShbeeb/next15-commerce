import { ProductGrid } from '@/app/products/_components/product-grid';
import { FilterSidebar } from './_components/filter-sidebar';
import { getMaxPrice, getProducts } from '@/server/product/queries';
import { getCategories } from '@/server/category/queries';
import { getSizes } from '@/server/size/queries';
import { getColors } from '@/server/color/queries';

interface ProductsPageProps {
  searchParams: Promise<{
    categories?: string;
    sizes?: string;
    colors?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function ProductsPage({ searchParams: searchParamsPromise }: ProductsPageProps) {
  const searchParams = await searchParamsPromise;
  const [products, categories, sizes, colors, maxPrice] = await Promise.all([
    getProducts({
      categoryIds: searchParams.categories?.split(','),
      sizeIds: searchParams.sizes?.split(','),
      colorIds: searchParams.colors?.split(','),
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      page: searchParams.page ? Number(searchParams.page) : 1,
      limit: searchParams.limit ? Number(searchParams.limit) : 10,
    }),
    getCategories({ limit: -1 }),
    getSizes({ limit: -1 }),
    getColors({ limit: -1 }),
    getMaxPrice(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <div className="flex gap-8">
        <FilterSidebar
          categories={categories as { id: string; name: string }[]}
          sizes={sizes as { id: string; name: string }[]}
          colors={colors as { id: string; name: string }[]}
          maxPrice={maxPrice}
        />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
