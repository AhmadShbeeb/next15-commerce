import { ProductGrid } from '@/app/products/_components/product-grid';
import { getProducts } from '@/server/product/queries';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}
