export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mb-8 h-6 w-48 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="overflow-hidden rounded-lg border">
            <div className="aspect-video bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-24 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-200" />
              </div>
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="h-6 w-16 rounded bg-gray-200" />
                <div className="h-8 w-24 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
