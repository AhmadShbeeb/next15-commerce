import { ProductForm } from '@/app/admin/products/_components/product-form';
import { notFound } from 'next/navigation';
import { getProduct } from '@/server/product/queries';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
