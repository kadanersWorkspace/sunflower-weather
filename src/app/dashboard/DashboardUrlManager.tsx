"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function DashboardUrlManager() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams?.has("units")) {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("units", "celsius");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, router]);

  return null;
}
