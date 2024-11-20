'use client';

import { REACT_QUERY_KEYS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { deleteCategory, upsertCategory } from '@/server/category/actions';
import { useQueryClient } from '@tanstack/react-query';
import { startTransition, useActionState, useEffect } from 'react';

interface CategoryFormProps {
  id?: string;
  name?: string;
  setMenuOpen: (open: boolean) => void;
}

export function CategoryForm({ id, name, setMenuOpen }: CategoryFormProps) {
  const [upsertState, upsertAction, isUpserting] = useActionState(upsertCategory, null);
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteCategory, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (upsertState?.success || deleteState?.success) {
      setMenuOpen(false);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); // Close the dialog
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.CATEGORIES] });
    }
  }, [upsertState?.success, deleteState?.success, queryClient, setMenuOpen]);

  return (
    <form action={upsertAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          name="name"
          type="text"
          defaultValue={name}
          className={cn('w-full rounded border p-2', !!upsertState?.error?.name && 'border-red-500')}
          required
        />
        {upsertState?.error?.name && <div className="text-red-500">{upsertState.error.name.join(', ')}</div>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isUpserting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isUpserting ? 'Saving...' : id ? 'Update Category' : 'Create Category'}
        </button>
        {id && (
          <button
            type="button"
            disabled={isDeleting}
            className="rounded-md border bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-gray-400"
            onClick={() => {
              startTransition(() => {
                deleteAction(id);
              });
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Category'}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); // Close the dialog
            setMenuOpen(false);
          }}
          className="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
