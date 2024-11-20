'use client';

import { REACT_QUERY_KEYS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { upsertSize } from '@/server/size/actions';
import { deleteSize } from '@/server/size/actions';
import { useQueryClient } from '@tanstack/react-query';
import { startTransition, useActionState, useEffect } from 'react';

interface SizeFormProps {
  id?: string;
  name?: string;
  setMenuOpen: (open: boolean) => void;
}

export function SizeForm({ id, name, setMenuOpen }: SizeFormProps) {
  const [formState, formAction, isPending] = useActionState(upsertSize, null);
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteSize, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState?.success || deleteState?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      setMenuOpen(false);
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.SIZES] });
    }
  }, [formState?.success, deleteState?.success, queryClient, setMenuOpen]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={id} />
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          name="name"
          type="text"
          defaultValue={name}
          className={cn('w-full rounded border p-2', !!formState?.error?.name && 'border-red-500')}
          required
        />
        {formState?.error?.name && <div className="text-red-500">{formState.error.name.join(', ')}</div>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Saving...' : id ? 'Update Size' : 'Create Size'}
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
            {isDeleting ? 'Deleting...' : 'Delete'}
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
