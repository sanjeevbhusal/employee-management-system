"use client";

import { Button } from "./ui/button";
import { useSession } from "../hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserInitials } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

function NavBar() {
  const user = useSession();
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);
  const pathname = usePathname();

  console.log(
    pathname,
    pathname.includes("/all-employees"),
    pathname.includes("/create-employee"),
  );

  return (
    <div className="flex items-center justify-between border-b px-4 py-4 lg:px-20">
      <h1 className="text-lg font-semibold">Employee Management System</h1>
      <div className="flex items-center gap-4">
        <Link href="/all-employees" className="hidden lg:block">
          <Button
            variant="link"
            className={
              pathname.includes("/all-employees")
                ? "text-sky-600 underline"
                : ""
            }
          >
            All Employees
          </Button>
        </Link>
        <Link href="/create-employee" className="hidden lg:block">
          <Button
            variant="link"
            className={
              pathname.includes("/create-employee")
                ? "text-sky-600 underline"
                : ""
            }
          >
            Create Employee
          </Button>
        </Link>
        {!user ? (
          <Button variant={"link"} onClick={() => signIn("google")}>
            Login
          </Button>
        ) : (
          <>
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Your Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="block lg:hidden">
              <Sheet
                open={openHamburgerMenu}
                onOpenChange={() => setOpenHamburgerMenu(!openHamburgerMenu)}
              >
                <SheetTrigger>
                  <RxHamburgerMenu size={24} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <Link href="/all-employees" className="">
                      <Button
                        variant="link"
                        onClick={() => setOpenHamburgerMenu(false)}
                      >
                        All Employees
                      </Button>
                    </Link>
                    <Link href="/create-employee" className="">
                      <Button
                        variant="link"
                        onClick={() => setOpenHamburgerMenu(false)}
                      >
                        Create Employee
                      </Button>
                    </Link>
                    <Button variant={"ghost"} className="justify-start">
                      Your Profile
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => signOut()}
                      className="justify-start"
                    >
                      Logout
                    </Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
