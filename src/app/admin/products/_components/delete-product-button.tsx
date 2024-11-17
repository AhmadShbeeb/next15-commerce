'use client';

import { deleteProduct } from '@/server/product/actions';
import { useActionState, useTransition } from 'react';

interface DeleteProductButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [deleteState, deleteAction] = useActionState(deleteProduct, null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteAction(productId);
    });
  }

  return (
    <>
      <button onClick={handleDelete} disabled={isPending} className='text-red-600 hover:text-red-900'>
        Delete
      </button>
      {deleteState?.error?.error && <p className='text-red-500'>{deleteState.error.error}</p>}
    </>
  );
}
