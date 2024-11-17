'use client';

import { Button } from '@/components/ui/button';
import { deleteProduct } from '@/server/product/actions';
import { RefreshCw, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';

interface DeleteProductButtonProps {
  productId: string;
  setDialogOpened: Dispatch<SetStateAction<boolean>>;
}

export function DeleteProductButton({ productId, setDialogOpened }: DeleteProductButtonProps) {
  const [deleteState, deleteAction] = useActionState(deleteProduct, null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteAction(productId);
      setDialogOpened(false);
    });
  }

  useEffect(() => {
    if (deleteState?.error?.error) {
      deleteState?.error?.error.forEach((error) => {
        toast.error(error);
      });
    }
  }, [deleteState?.error?.error]);

  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive" className="bg-red-500 hover:bg-red-600">
      {isPending ? (
        <div className="flex items-center gap-2">
          <RefreshCw className="animate-spin" />
          Deleting...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Trash className="h-4 w-4" />
          Delete
        </div>
      )}
    </Button>
  );
}
