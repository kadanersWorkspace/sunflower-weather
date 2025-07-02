export default function SortSkeleton() {
  return (
    <div className="mb-8">
      <div className="h-4 bg-gray-100 rounded w-14 mb-4 animate-pulse"></div>
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-100 rounded w-10 animate-pulse"></div>
        <span className="text-gray-300 mx-2">|</span>
        <div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  );
}
