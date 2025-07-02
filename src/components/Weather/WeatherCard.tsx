interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  weatherDescription: string;
  weatherIcon: string;
  tempUnit: string;
}

export default function WeatherCard({
  temperature,
  humidity,
  windSpeed,
  windDirection,
  weatherDescription,
  weatherIcon,
  tempUnit,
}: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-6xl">{weatherIcon}</div>
          <div>
            <div className="text-4xl font-bold text-gray-900">
              {temperature}
              {tempUnit}
            </div>
            <div className="text-lg text-gray-600 capitalize">
              {weatherDescription}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">💧</div>
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="text-lg font-semibold text-gray-900">{humidity}%</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">💨</div>
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="text-lg font-semibold text-gray-900">
            {windSpeed} km/h
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">🧭</div>
          <div className="text-sm text-gray-600">Wind Direction</div>
          <div className="text-lg font-semibold text-gray-900">
            {windDirection}
          </div>
        </div>
      </div>
    </div>
  );
}
