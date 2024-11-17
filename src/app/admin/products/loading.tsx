export default function Loading() {
  return (
    <div className='animate-pulse'>
      <div className='h-8 w-48 bg-gray-200 rounded mb-6'></div>
      <div className='grid grid-cols-1 gap-4'>
        {[1, 2, 3, 4].map(n => (
          <div key={n} className='h-20 bg-gray-200 rounded'></div>
        ))}
      </div>
    </div>
  );
}
