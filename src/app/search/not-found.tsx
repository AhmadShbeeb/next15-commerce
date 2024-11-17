import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='text-center py-12'>
      <p className='text-gray-600'>No products found matching your search.</p>
      <p className='text-gray-600 mt-2'>
        Try searching for something else or{' '}
        <Link href='/' className='text-blue-600 hover:text-blue-800'>
          browse all products
        </Link>
        .
      </p>
    </div>
  );
}
