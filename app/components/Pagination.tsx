"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Button } from "./ui/button";

// What is the maximum page you can go.

// Total items: 50
// Items per page: 10

// Final Page = 55 / 10 = 5.5

interface PaginationProps {
  totalUsers: number;
}

function Pagination({ totalUsers }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const lastPage = Math.ceil(totalUsers / 10);

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }
  function forwardPage() {
    if (currentPage === lastPage) return;
    setPage(currentPage + 1);
  }

  function backwardPage() {
    if (currentPage === 1) return;
    setPage(currentPage - 1);
  }

  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <Button
        variant={"ghost"}
        className="h-10 w-10 p-0"
        disabled={currentPage === 1}
        onClick={backwardPage}
      >
        <IoArrowBack className="cursor-pointer" />
      </Button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {lastPage}
      </span>
      <Button
        variant={"ghost"}
        className="h-10 w-10 p-0"
        disabled={currentPage === lastPage}
        onClick={forwardPage}
      >
        <IoArrowForward className="cursor-pointer" />
      </Button>
    </div>
  );
}

export { Pagination };
