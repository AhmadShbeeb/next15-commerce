/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader';
import { SerializedCategory } from '@/types/serialized-types';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { DeleteTableRowButton } from '@/components/delete-table-row-button';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { deleteCategory } from '@/server/category/actions';

export const Columns: ColumnDef<SerializedCategory>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    meta: 'Name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    meta: 'Created At',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => <>{format(row.original.createdAt, 'dd/MM/yyyy')}</>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();
      const [dialogOpened, setDialogOpened] = useState(false);

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
                  router.push(`/admin/categories/${category.id}/update`);
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
                  rowId={category.id}
                  queryKey={REACT_QUERY_KEYS.PAGINATED_CATEGORIES}
                  setDialogOpened={setDialogOpened}
                  deleteAction={deleteCategory}
                />
                <Button variant="outline" onClick={() => setDialogOpened(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      );
    },
  },
];
