"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      placeholder="Search Employees by Name"
      className="ml-auto w-96"
      onChange={(e) => onChange(e.target.value)}
      defaultValue={searchParams.get("query") || ""}
    />
  );
}

export { SearchBar };
