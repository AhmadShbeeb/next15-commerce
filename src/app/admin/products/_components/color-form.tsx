'use client';

import { REACT_QUERY_KEYS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { upsertColor } from '@/server/color/actions';
import { deleteColor } from '@/server/color/actions';
import { useQueryClient } from '@tanstack/react-query';
import { startTransition, useActionState, useEffect } from 'react';

interface ColorFormProps {
  id?: string;
  name?: string;
  setMenuOpen: (open: boolean) => void;
}

export function ColorForm({ id, name, setMenuOpen }: ColorFormProps) {
  const [formState, formAction, isPending] = useActionState(upsertColor, null);
  const [deleteState, deleteAction, isDeleting] = useActionState(deleteColor, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState?.success || deleteState?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); // Close the dialog
      setMenuOpen(false);
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.COLORS] });
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
          {isPending ? 'Saving...' : id ? 'Update Color' : 'Create Color'}
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
            {isDeleting ? 'Deleting...' : 'Delete Color'}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); // Close the dialog
            setMenuOpen(false);
          }}
          className="rounded-md border px-4 py-2 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
