export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex flex-col items-center">
                <div className="mb-4 h-24 w-24 rounded-full bg-gray-200" />
                <div className="mb-2 h-6 w-32 rounded bg-gray-200" />
                <div className="h-4 w-48 rounded bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 h-6 w-32 rounded bg-gray-200" />
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-lg border p-4">
                    <div className="h-20 rounded bg-gray-200" />
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
