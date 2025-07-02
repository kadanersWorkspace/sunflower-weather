export default function CardSkeleton() {
  return (
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="p-0 leading-[26px]">
        <div className="h-6 bg-white/20 rounded w-3/4 mb-1 animate-pulse"></div>
        <div className="h-5 bg-white/20 rounded w-1/2 animate-pulse"></div>
      </div>

      <div className="mt-auto">
        <div className="space-y-1">
          <div className="h-3 bg-white/20 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-white/20 rounded w-5/6 animate-pulse"></div>
          <div className="h-3 bg-white/20 rounded w-4/6 animate-pulse"></div>
          <div className="h-3 bg-white/20 rounded w-3/6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
