"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface SearchProps {
  label: string;
  placeholder: string;
  queryParam?: string; // The URL query parameter name (defaults to 'search')
}

export default function Search({
  label,
  placeholder,
  queryParam = "search",
}: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get(queryParam) || ""
  );

  const debouncedSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);

      if (term.trim()) {
        params.set(queryParam, term.trim());
      } else {
        params.delete(queryParam);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router, queryParam]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const urlSearch = searchParams.get(queryParam) || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams, queryParam]);

  return (
    <div>
      <h2 className="text-[16px] font-normal text-gray-900 mb-4">{label}</h2>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-[10px] py-[5px] text-base text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
