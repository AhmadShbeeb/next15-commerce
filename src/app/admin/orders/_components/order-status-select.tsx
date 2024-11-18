'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REACT_QUERY_KEYS } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { updateOrderStatus } from '@/server/order/actions';
import { OrderStatus } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

interface OrderStatusSelectProps {
  orderId: string;
  initialStatus: OrderStatus;
}

export function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
  const queryClient = useQueryClient();
  const [actionState, updateOrderStatusAction, isPending] = useActionState(updateOrderStatus, null);

  function handleStatusUpdate(status: string) {
    startTransition(() => {
      updateOrderStatusAction({ orderId, status: status as OrderStatus });
    });
  }

  useEffect(() => {
    if (actionState?.success) {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.PAGINATED_ORDERS] });
      toast.success('Order status updated successfully');
    } else if (actionState?.error?.error) {
      actionState?.error?.error.forEach((error) => {
        toast.error(error);
      });
    }
  }, [actionState, queryClient]);

  return (
    <Select value={initialStatus} onValueChange={handleStatusUpdate} disabled={isPending}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(OrderStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {capitalizeFirstLetter(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
