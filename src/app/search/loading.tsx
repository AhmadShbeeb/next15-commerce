export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      <div className='h-10 w-64 bg-gray-200 rounded mb-2'></div>
      <div className='h-6 w-48 bg-gray-200 rounded mb-8'></div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <div key={n} className='border rounded-lg overflow-hidden'>
            <div className='h-48 bg-gray-200'></div>
            <div className='p-4 space-y-3'>
              <div className='h-6 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-2/3'></div>
              <div className='h-8 bg-gray-200 rounded'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
