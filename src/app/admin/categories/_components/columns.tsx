/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { DataTableColumnHeader } from '@/components/DataTableColumnHeader';
import { TableDialogMenu } from '@/components/table-dialog-menu';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { deleteCategory } from '@/server/category/actions';
import { SerializedCategory } from '@/types/serialized-types';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

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

      return (
        <TableDialogMenu
          updateLink={`/admin/categories/${category.id}/update`}
          rowId={category.id}
          deleteAction={deleteCategory}
          queryKey={REACT_QUERY_KEYS.PAGINATED_CATEGORIES}
        />
      );
    },
  },
];
