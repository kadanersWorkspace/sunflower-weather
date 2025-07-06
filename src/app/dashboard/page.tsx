import { City } from "@/mocks/cities";
import CityList from "@/components/CityList/CityList";
import DashboardFilters from "@/components/DashboardFilters/DashboardFilters";
import DashboardUrlManager from "./DashboardUrlManager";

// Extended type for cities with distance
type CityWithDistance = City & {
  distanceFromTelAviv?: number;
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = typeof params?.search === "string" ? params.search : "";
  const continentQuery =
    typeof params?.continent === "string" ? params.continent : "";
  const sortBy = typeof params?.sortBy === "string" ? params.sortBy : "";

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const apiUrl = new URL("/api/cities", baseUrl);

  if (searchQuery) {
    apiUrl.searchParams.set("search", searchQuery);
  }

  if (continentQuery) {
    apiUrl.searchParams.set("continent", continentQuery);
  }

  if (sortBy) {
    apiUrl.searchParams.set("sortBy", sortBy);
  }

  const res = await fetch(apiUrl.toString());
  const data: { cities: CityWithDistance[] } = await res.json();

  return (
    <>
      <DashboardUrlManager />
      <DashboardFilters />
      <CityList cities={data.cities} />
    </>
  );
}
