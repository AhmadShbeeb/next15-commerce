import { ProductGrid } from '@/app/products/_components/product-grid';
import { getProducts } from '@/server/product/queries';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
