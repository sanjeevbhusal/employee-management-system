"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";

interface TagProps {
  type: string;
  name: string;
}

function Tag({ type, name }: TagProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function removeTag() {
    const params = new URLSearchParams(searchParams);
    params.delete(type);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative mt-4 w-fit rounded-lg border p-2 pr-6 text-sm text-gray-600">
      {type} : {name}
      <IoIosClose
        className="absolute right-[2px] top-0 cursor-pointer"
        size={20}
        onClick={removeTag}
      />
    </div>
  );
}

export { Tag };
