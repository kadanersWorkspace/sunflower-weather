import { getWeatherIcon } from "@/lib/weather";

interface DailyData {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherDescription: string;
  precipitation: number;
}

interface DailyForecastProps {
  dailyData: DailyData[];
  tempUnit: string;
}

export default function DailyForecast({
  dailyData,
  tempUnit,
}: DailyForecastProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="space-y-4">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-16 text-sm text-gray-600 font-medium">
                {day.date}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getWeatherIcon(day.weatherCode)}
                </div>
                <div className="text-sm text-gray-600 capitalize min-w-[120px]">
                  {day.weatherDescription}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {day.precipitation > 0 && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <span className="text-sm">🌧️</span>
                  <span className="text-sm">{day.precipitation}mm</span>
                </div>
              )}

              <div className="flex items-center space-x-2 min-w-[80px] justify-end">
                <span className="text-lg font-semibold text-gray-900">
                  {day.maxTemp}
                  {tempUnit}
                </span>
                <span className="text-lg text-gray-500">
                  {day.minTemp}
                  {tempUnit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
