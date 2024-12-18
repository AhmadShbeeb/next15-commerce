/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from '@/components/table/table-header';
import { TableDialogMenu } from '@/components/table/table-dialog-menu';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { deleteProduct } from '@/server/product/actions';
import { SerializedProductPaginated } from '@/types/serialized-types';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

export const Columns: ColumnDef<SerializedProductPaginated['items'][number]>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    meta: 'ID',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    id: 'image',
    accessorKey: 'images',
    header: 'Image',
    meta: 'Image',
    cell: ({ row }) => {
      const image = row.original.images?.[0]?.url;

      return (
        <div className="flex h-14 w-14 items-center justify-center">
          {image ? (
            <Image className="rounded" width={50} height={50} src={image} alt="img" />
          ) : (
            <ImageIcon className="h-14 w-14 rounded-md bg-slate-100" />
          )}
        </div>
      );
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    meta: 'Name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    id: 'category',
    accessorKey: 'category.name',
    meta: 'Category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  },
  {
    id: 'price',
    accessorKey: 'price',
    meta: 'Price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
  },
  {
    id: 'quantity',
    accessorKey: 'quantity',
    meta: 'Quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
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
      const product = row.original;

      return (
        <TableDialogMenu
          updateLink={`/admin/products/${product.id}/update`}
          rowId={product.id}
          deleteAction={deleteProduct}
          queryKey={REACT_QUERY_KEYS.PAGINATED_PRODUCTS}
        />
      );
    },
  },
];
