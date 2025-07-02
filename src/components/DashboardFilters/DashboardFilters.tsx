"use client";

import Search from "@/components/Search/Search";
import Sort from "@/components/Sort/Sort";
import Units from "@/components/Units/Units";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "distance", label: "Distance" },
];

export default function DashboardFilters() {
  return (
    <div className="">
      <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-8">
        <Search
          label="Search"
          placeholder="Type to search"
          queryParam="search"
        />

        <Search label="Continent" placeholder="" queryParam="continent" />
        <Sort label="Sort by" options={SORT_OPTIONS} queryParam="sortBy" />
        <Units label="Units" />
      </div>
    </div>
  );
}
