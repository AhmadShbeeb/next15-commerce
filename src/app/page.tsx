import { ProductGrid } from '@/app/products/_components/product-grid';
import { Cart } from '@/components/cart/cart';
import { getProducts } from '@/server/product/queries';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className='container mx-auto px-4 py-8'>
      <Cart />
      <h1 className='text-3xl font-bold mb-8'>Our Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}