'use client';

import { useRouter } from 'next/navigation';
import { upsertCategory } from '@/server/category/actions';
import { useActionState } from 'react';

interface CategoryFormProps {
  category?: {
    id?: string;
    name: string;
  };
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(upsertCategory, null);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={category?.id} />
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input name="name" type="text" defaultValue={category?.name} className="w-full rounded border p-2" required />
        {formState?.error?.name && <div className="text-red-500">{formState.error.name.join(', ')}</div>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Saving...' : category?.id ? 'Update Category' : 'Create Category'}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-md border px-4 py-2 hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </form>
  );
}
