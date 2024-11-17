'use client';

import { SerializedProduct } from '@/types/serialized-types';
import { useRouter } from 'next/navigation';
import { upsertProduct } from '@/server/product/actions';
import { useActionState } from 'react';

interface ProductFormProps {
  product?: SerializedProduct;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(upsertProduct, null);

  return (
    <form action={formAction} className='space-y-6'>
      <input type='hidden' name='id' defaultValue={product?.id} />
      <div>
        <label className='block text-sm font-medium mb-1'>Name</label>
        <input name='name' type='text' defaultValue={product?.name} className='w-full p-2 border rounded' required />
        {formState?.error?.name && <div className='text-red-500'>{formState.error.name.join(', ')}</div>}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Description</label>
        <textarea
          name='description'
          defaultValue={product?.description}
          className='w-full p-2 border rounded'
          rows={4}
          required
        />
        {formState?.error?.description && <div className='text-red-500'>{formState.error.description.join(', ')}</div>}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Price</label>
        <input
          name='price'
          type='number'
          defaultValue={product?.price}
          step='0.01'
          className='w-full p-2 border rounded'
          required
        />
        {formState?.error?.price && <div className='text-red-500'>{formState.error.price.join(', ')}</div>}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Image URL</label>
        <input
          name='images'
          type='url'
          defaultValue={product?.images && product?.images.length > 0 ? product?.images[0] : ''}
          className='w-full p-2 border rounded'
        />
        {formState?.error?.images && <div className='text-red-500'>{formState.error.images.join(', ')}</div>}
      </div>

      <div className='flex gap-4'>
        <button
          type='submit'
          disabled={isPending}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400'
        >
          {isPending ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
        </button>
        <button type='button' onClick={() => router.back()} className='px-4 py-2 border rounded-md hover:bg-gray-100'>
          Cancel
        </button>
      </div>
    </form>
  );
}
