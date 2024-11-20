'use client';

import { Button } from '@/components/ui/button';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';

interface DeleteTableRowButtonProps {
  rowId: string;
  setDialogOpened: Dispatch<SetStateAction<boolean>>;
  queryKey: (typeof REACT_QUERY_KEYS)[keyof typeof REACT_QUERY_KEYS];
  deleteAction: (prevState: unknown, rowId: string) => Promise<{ success: boolean; error?: { error?: string[] } }>;
}

export function DeleteTableRowButton({ rowId, queryKey, setDialogOpened, deleteAction }: DeleteTableRowButtonProps) {
  const [deleteState, deletionAction] = useActionState(deleteAction, null);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  function handleDelete() {
    startTransition(() => {
      deletionAction(rowId);
    });
  }

  useEffect(() => {
    if (deleteState?.success) {
      setDialogOpened(false);
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
    }
    if (deleteState?.error?.error) {
      deleteState?.error?.error.forEach((error) => {
        toast.error(error);
      });
    }
  }, [deleteState?.error?.error, deleteState?.success, queryClient, setDialogOpened, queryKey]);

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
