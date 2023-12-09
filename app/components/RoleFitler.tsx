"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Department, Role } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface RoleFilterProps {
  roles: Role[];
}

function RoleFilter({ roles }: RoleFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setRole(role: string) {
    const params = new URLSearchParams(searchParams);
    params.set("role", role);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={setRole}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={role.name}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { RoleFilter };
