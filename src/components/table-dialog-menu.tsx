'use client';

import { DeleteTableRowButton } from '@/components/delete-table-row-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TableDialogMenuProps {
  rowId: string;
  updateLink: string;
  deleteAction: (prevState: unknown, rowId: string) => Promise<{ success: boolean; error?: { error?: string[] } }>;
  queryKey: (typeof REACT_QUERY_KEYS)[keyof typeof REACT_QUERY_KEYS];
}

export function TableDialogMenu({ updateLink, rowId, deleteAction, queryKey }: TableDialogMenuProps) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer justify-between"
            onClick={() => {
              router.push(updateLink);
            }}
          >
            Update
            <Edit className="h-6 w-6 text-blue-500" />
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer justify-between"
            onClick={() => {
              setDialogOpened(true);
            }}
          >
            Delete <Trash className="h-6 w-6 text-red-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialogOpened && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <DialogFooter>
            <DeleteTableRowButton
              rowId={rowId}
              queryKey={queryKey}
              setDialogOpened={setDialogOpened}
              deleteAction={deleteAction}
            />
            <Button variant="outline" onClick={() => setDialogOpened(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
