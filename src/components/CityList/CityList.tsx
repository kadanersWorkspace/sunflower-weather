import Link from "next/link";
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
  return (
    <div className="grid auto-rows-min gap-7 md:grid-cols-6">
      {cities.map((city) => (
        <Link
          key={city.country + city.name}
          href={`/weather/${encodeURIComponent(city.name.toLowerCase())}`}
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
