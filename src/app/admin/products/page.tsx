import { ProductList } from '@/app/admin/products/_components/product-list';
import { getProducts } from '@/server/product/queries';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Link
          href='/admin/products/new'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
        >
          Add Product
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
}
