"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { City } from "@/mocks/cities";
import {
  Card,
  CardBackground,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Card/Card";

// Extended type for cities with distance
type CityWithDistance = City & {
  distanceFromTelAviv?: number;
};

export default function CityList({ cities }: { cities: CityWithDistance[] }) {
  const searchParams = useSearchParams();

  const createWeatherUrl = (cityName: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    // Ensure units parameter exists, default to celsius if not set
    if (!params.has("units")) {
      params.set("units", "celsius");
    }
    const weatherPath = `/weather/${encodeURIComponent(
      cityName.toLowerCase()
    )}`;
    return `${weatherPath}?${params.toString()}`;
  };

  if (cities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find cities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min gap-7 md:grid-cols-6">
      {cities.map((city) => (
        <Link
          key={city.country + city.name}
          href={createWeatherUrl(city.name)}
          className="transition-transform hover:scale-105 cursor-pointer"
        >
          <Card
            data-testid={`city-card`}
            className="w-[222px] h-[206px] p-[20px] @container/card text-white "
          >
            <CardBackground
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover"
            />
            <CardHeader className="p-0 leading-[26px]">
              <CardTitle className="text-[26px] p-0 font-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {city.name}
              </CardTitle>
              <CardTitle className="text-[20px] font-light text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {city.country}
              </CardTitle>
            </CardHeader>
            <CardDescription>
              <p className="line-clamp-6 text-[12px] leading-[16px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {city.description}
              </p>
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
}
