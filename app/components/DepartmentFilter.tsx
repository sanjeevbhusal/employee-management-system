"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Department } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DepartmentFilterProps {
  departments: Department[];
}

function DepartmentFilter({ departments }: DepartmentFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setDepartment(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("department", id);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={setDepartment}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Department" />
      </SelectTrigger>
      <SelectContent>
        {departments.map((department) => (
          <SelectItem key={department.id} value={department.id.toString()}>
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { DepartmentFilter };
