import { getWeatherIcon } from "@/lib/weather";

interface HourlyData {
  time: string;
  temperature: number;
  humidity: number;
  weatherCode: number;
  weatherDescription: string;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
  tempUnit: string;
}

export default function HourlyForecast({
  hourlyData,
  tempUnit,
}: HourlyForecastProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="overflow-x-auto">
        <div
          className="flex space-x-4 pb-4"
          style={{ minWidth: "max-content" }}
        >
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center p-4 bg-gray-50 rounded-lg min-w-[120px]"
            >
              <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
              <div className="text-2xl mb-2">
                {getWeatherIcon(hour.weatherCode)}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {hour.temperature}
                {tempUnit}
              </div>
              <div className="text-xs text-gray-500">
                {hour.humidity}% humidity
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
