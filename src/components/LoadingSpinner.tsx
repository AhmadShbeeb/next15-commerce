import { LoaderPinwheel } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center">
        <LoaderPinwheel className="h-20 w-20 animate-spin text-sky-500" aria-hidden="true" />
      </div>
    </div>
  );
};
