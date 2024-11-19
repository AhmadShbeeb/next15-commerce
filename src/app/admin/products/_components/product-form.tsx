'use client';

import { SerializedProduct } from '@/types/serialized-types';
import { useRouter } from 'next/navigation';
import { upsertProduct } from '@/server/product/actions';
import { useActionState } from 'react';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { cn } from '@/lib/utils';
import { SelectSearchable } from '@/components/select-searchable';
interface ProductFormProps {
  product?: SerializedProduct;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(upsertProduct, null);
  const { data: categories } = useGetCategories();

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={product?.id} />
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          name="name"
          type="text"
          defaultValue={product?.name}
          className={cn('w-full rounded border p-2', {
            'border-red-500': formState?.error?.name,
          })}
          required
        />
        {formState?.error?.name && <div className="text-red-500">{formState.error.name.join(', ')}</div>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={product?.description}
          className={cn('w-full rounded border p-2', {
            'border-red-500': formState?.error?.description,
          })}
          rows={4}
          required
        />
        {formState?.error?.description && <div className="text-red-500">{formState.error.description.join(', ')}</div>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Price</label>
        <input
          name="price"
          type="number"
          defaultValue={product?.price}
          step="0.01"
          className={cn('w-full rounded border p-2', {
            'border-red-500': formState?.error?.price,
          })}
          required
        />
        {formState?.error?.price && <div className="text-red-500">{formState.error.price.join(', ')}</div>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Image URL</label>
        <input
          name="images"
          type="url"
          defaultValue={product?.images && product?.images.length > 0 ? product?.images[0] : ''}
          className={cn('w-full rounded border p-2', {
            'border-red-500': formState?.error?.images,
          })}
        />
        {formState?.error?.images && <div className="text-red-500">{formState.error.images.join(', ')}</div>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>
        {/* <select
          name="categoryId"
          defaultValue={product?.categoryId}
          className={cn('w-full rounded border p-2', {
            'border-red-500': formState?.error?.categoryId,
          })}
          required
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select> */}

        <SelectSearchable
          items={categories?.map((category) => ({ id: category.id, name: category.name })) ?? []}
          placeholder="category"
          createLink="/admin/categories/create"
          inputName="categoryId"
          defaultValue={product?.categoryId}
        />

        {formState?.error?.categoryId && <div className="text-red-500">{formState.error.categoryId.join(', ')}</div>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-md border px-4 py-2 hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </form>
  );
}
