import { useIsFetching } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  handleRefresh: () => void;
}
export const TableRefreshButton = ({ handleRefresh }: Props) => {
  const isFetching = useIsFetching();

  return (
    <Button
      disabled={!!isFetching}
      size="icon"
      className="size-8 bg-transparent text-stone-700/95 hover:bg-transparent hover:text-stone-700/60"
      onClick={() => handleRefresh()}
      type="button"
    >
      <RefreshCw className={cn('', { 'animate-spin': isFetching })} />
    </Button>
  );
};
