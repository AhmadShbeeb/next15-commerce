export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="rounded-lg border">
        <div className="h-[400px] animate-pulse bg-gray-200" />
      </div>
    </div>
  );
}
