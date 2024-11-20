import { PaginationQuery } from '@/server/common/pagination-validation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertEnum(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().replace(/_/g, ' ');
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function paginationSearchParams(searchParams: PaginationQuery) {
  return new URLSearchParams({
    query: searchParams.query ?? '',
    page: String(searchParams.page ?? 1),
    limit: String(searchParams.limit ?? 10),
    orderBy: searchParams.orderBy ?? '',
    orderDirection: searchParams.orderDirection ?? '',
  });
}
