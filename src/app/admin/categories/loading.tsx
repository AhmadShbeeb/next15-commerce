export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-48 rounded bg-gray-200"></div>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-20 rounded bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}
