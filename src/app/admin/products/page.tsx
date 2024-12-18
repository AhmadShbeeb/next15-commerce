import Link from 'next/link';
import { ProductsTable } from './_components/products-table';

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>
      <ProductsTable />
    </div>
  );
}
