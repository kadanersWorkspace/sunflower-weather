export default function WeatherLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-12 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Weather Skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div>
                  <div className="h-12 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Forecast Skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="overflow-x-auto">
              <div
                className="flex space-x-4 pb-4"
                style={{ minWidth: "max-content" }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 text-center p-4 bg-gray-50 rounded-lg min-w-[120px]"
                  >
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-12 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Forecast Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
