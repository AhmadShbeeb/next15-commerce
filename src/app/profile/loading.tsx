export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto animate-pulse'>
        <div className='h-8 w-48 bg-gray-200 rounded mb-8'></div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-1'>
            <div className='bg-white shadow rounded-lg p-6'>
              <div className='flex flex-col items-center'>
                <div className='w-24 h-24 bg-gray-200 rounded-full mb-4'></div>
                <div className='h-6 w-32 bg-gray-200 rounded mb-2'></div>
                <div className='h-4 w-48 bg-gray-200 rounded'></div>
              </div>
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='bg-white shadow rounded-lg p-6'>
              <div className='h-6 w-32 bg-gray-200 rounded mb-4'></div>
              <div className='space-y-4'>
                {[1, 2, 3].map(n => (
                  <div key={n} className='border rounded-lg p-4'>
                    <div className='h-20 bg-gray-200 rounded'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
