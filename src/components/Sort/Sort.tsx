"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SortProps {
  label: string;
  options: { value: string; label: string }[];
  queryParam?: string;
}

export default function Sort({
  label,
  options,
  queryParam = "sortBy",
}: SortProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentSort = searchParams.get(queryParam) || "";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== currentSort) {
      params.set(queryParam, value);
    } else if (value === currentSort) {
      params.delete(queryParam);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-[16px] font-normal text-gray-900 mb-4">{label}</h2>
      <div className="flex items-center gap-2">
        {options.map((option, index) => (
          <div key={option.value} className="flex items-center">
            <button
              onClick={() => handleSortChange(option.value)}
              className={`text-[16px] cursor-pointer transition-colors duration-200 ${
                currentSort === option.value
                  ? "text-gray-900 font-medium underline"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {option.label}
            </button>
            {index < options.length - 1 && (
              <span className="text-gray-400 mx-2">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
