'use client';

import { REACT_QUERY_KEYS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { upsertColor } from '@/server/color/actions';
import { deleteColor } from '@/server/color/actions';
import { useQueryClient } from '@tanstack/react-query';
import { startTransition, useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={name}
          className={cn({
            'border-destructive': formState?.error?.name,
          })}
          required
        />
        {formState?.error?.name && <p className="text-sm text-destructive">{formState.error.name.join(', ')}</p>}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : id ? 'Update Color' : 'Create Color'}
        </Button>

        {id && (
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={() => {
              startTransition(() => {
                deleteAction(id);
              });
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Color'}
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            setMenuOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}