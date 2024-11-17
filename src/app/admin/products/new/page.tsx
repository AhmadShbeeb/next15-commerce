import { ProductForm } from '@/app/admin/products/_components/product-form';

export default function NewProductPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Create New Product</h1>
      <ProductForm />
    </div>
  );
}
