"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function GenderFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setGender(gender: string) {
    const params = new URLSearchParams(searchParams);
    params.set("gender", gender);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={setGender}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { GenderFilter };
