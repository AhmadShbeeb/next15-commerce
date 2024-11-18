import { cn } from '@/lib/utils';
import { LoaderPinwheel } from 'lucide-react';

type Props = {
  centerScreen?: boolean;
};

export const LoadingSpinner = ({ centerScreen = true }: Props) => {
  return (
    <div
      className={cn('flex items-center justify-center', {
        'fixed inset-0 h-full': centerScreen,
      })}
    >
      <LoaderPinwheel className="h-20 w-20 animate-spin text-sky-500" aria-hidden="true" />
    </div>
  );
};
