'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader';
import { SerializedOrder } from '@/types/serialized-types';
import { OrderStatusSelect } from './order-status-select';

export const Columns: ColumnDef<SerializedOrder>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    meta: 'ID',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    id: 'user',
    accessorKey: 'user',
    meta: 'Customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      );
    },
  },
  {
    id: 'total',
    accessorKey: 'total',
    meta: 'Total',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <>${row.original.total.toFixed(2)}</>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    meta: 'Status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <OrderStatusSelect orderId={row.original.id} initialStatus={row.original.status} />,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    meta: 'Created At',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => <>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm')}</>,
  },
];
