import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import SearchSkeleton from "@/components/Skeleton/SearchSkeleton";
import SortSkeleton from "@/components/Skeleton/SortSkeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-8">
          <SearchSkeleton />
          <SearchSkeleton />
          <SortSkeleton />
          <SortSkeleton />
        </div>
      </div>

      <div className="grid auto-rows-min gap-7 md:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="w-[222px] h-[206px] p-[20px] relative bg-gray-100 rounded-xl animate-pulse"
          >
            <CardSkeleton />
          </div>
        ))}
      </div>
    </>
  );
}
