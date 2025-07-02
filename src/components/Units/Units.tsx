"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UnitsProps {
  label: string;
}

const UNIT_OPTIONS = [
  { value: "celsius", label: "°C" },
  { value: "fahrenheit", label: "°F" },
];

export default function Units({ label }: UnitsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentUnit = searchParams?.get("units") || "celsius";

  const handleUnitChange = (unit: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (currentUnit === unit) {
      return;
    } else {
      params.set("units", unit);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <label className="block text-[16px] font-normal text-gray-700 mb-4">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {UNIT_OPTIONS.map((option, index) => (
          <div key={option.value} className="flex items-center">
            <button
              onClick={() => handleUnitChange(option.value)}
              className={`text-[16px] transition-colors duration-200 cursor-pointer ${
                currentUnit === option.value
                  ? "text-gray-900 font-medium underline"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {option.label}
            </button>
            {index < UNIT_OPTIONS.length - 1 && (
              <span className="text-gray-300 mx-2">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
