import Image from 'next/image';
import Link from 'next/link';
import { DeleteProductButton } from './delete-product-button';
import { SerializedProduct } from '@/types/serialized-types';

interface ProductListProps {
  products: SerializedProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="relative h-16 w-16">
                  <Image
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
              <td className="whitespace-nowrap px-6 py-4">${product.price.toFixed(2)}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link href={`/admin/products/${product.id}/edit`} className="mr-4 text-blue-600 hover:text-blue-900">
                  Edit
                </Link>
                <DeleteProductButton productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
