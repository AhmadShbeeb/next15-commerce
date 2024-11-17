'use client';
import type { Column } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ArrowDownAZ, ArrowUpAZ, Eye, Filter } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  hide?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  hide,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const handleSorting = (toggle: boolean) => {
    column.toggleSorting(toggle);
  };

  if (hide) {
    column.toggleVisibility(false);
    return null;
  }
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpAZ className="ml-2 h-4 w-4" />
            ) : (
              <Filter className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-md bg-slate-100">
          <DropdownMenuItem onClick={() => handleSorting(false)}>
            <Button variant="ghost" size="sm" className="hover:bg-slate-100/50">
              <ArrowUpAZ className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSorting(true)}>
            <Button variant="ghost" size="sm" className="hover:bg-slate-100/50">
              <ArrowDownAZ className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Button variant="ghost" size="sm" className="hover:bg-slate-100/50">
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
