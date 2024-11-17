import { ProductGrid } from '@/app/products/_components/product-grid';
import { getProducts } from '@/server/product/queries';
import { Metadata } from 'next';
import NotFound from './not-found';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const products = await getProducts({ query: q });

  if (products.total === 0) {
    return <NotFound />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Search Results</h1>
      <p className="mb-8 text-gray-600">
        {products.total} results for &quot;{q}&quot;
      </p>
      <ProductGrid products={products} />
    </main>
  );
}
