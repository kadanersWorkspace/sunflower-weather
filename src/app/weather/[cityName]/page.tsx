import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  fetchWeatherData,
  processWeatherData,
  getWeatherIcon,
  getWindDirection,
  getTemperatureUnit,
} from "@/lib/weather";
import { cities } from "@/mocks/cities";
import WeatherCard from "@/components/Weather/WeatherCard";
import HourlyForecast from "@/components/Weather/HourlyForecast";
import DailyForecast from "@/components/Weather/DailyForecast";
import WeatherLoadingSkeleton from "@/components/Weather/WeatherLoadingSkeleton";

interface WeatherPageProps {
  params: Promise<{
    cityName: string;
  }>;
  searchParams: Promise<{
    units?: string;
  }>;
}

async function WeatherContent({
  cityName,
  units,
}: {
  cityName: string;
  units: string;
}) {
  // Find the city in our data
  const city = cities.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(cityName).toLowerCase()
  );

  if (!city) {
    notFound();
  }

  try {
    const weatherData = await fetchWeatherData(
      city.coords.lat,
      city.coords.lng
    );
    const processedData = processWeatherData(weatherData, units);
    const tempUnit = getTemperatureUnit(units);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  ← Back to Dashboard
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {city.name}
                  </h1>
                  <p className="text-gray-600">{city.country}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl">
                  {getWeatherIcon(processedData.current.weatherCode)}
                </div>
                <p className="text-sm text-gray-600">
                  {processedData.current.weatherDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Current Weather */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Weather
            </h2>
            <WeatherCard
              temperature={processedData.current.temperature}
              humidity={processedData.current.humidity}
              windSpeed={processedData.current.windSpeed}
              windDirection={getWindDirection(
                processedData.current.windDirection
              )}
              weatherDescription={processedData.current.weatherDescription}
              weatherIcon={getWeatherIcon(processedData.current.weatherCode)}
              tempUnit={tempUnit}
            />
          </div>

          {/* Hourly Forecast */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              24-Hour Forecast
            </h2>
            <HourlyForecast
              hourlyData={processedData.hourly}
              tempUnit={tempUnit}
            />
          </div>

          {/* Daily Forecast */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7-Day Forecast
            </h2>
            <DailyForecast
              dailyData={processedData.daily}
              tempUnit={tempUnit}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Weather data unavailable
          </h1>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't fetch the weather data for {city.name}.
          </p>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default async function WeatherPage({
  params,
  searchParams,
}: WeatherPageProps) {
  const { cityName } = await params;
  const { units = "celsius" } = await searchParams;

  return (
    <Suspense fallback={<WeatherLoadingSkeleton />}>
      <WeatherContent cityName={cityName} units={units} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    cityName: encodeURIComponent(city.name.toLowerCase()),
  }));
}
