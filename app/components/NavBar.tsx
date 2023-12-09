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

function NavBar() {
  const user = useSession();
  console.log(user);
  if (user) {
    user.image = "";
  }
  return (
    <div className="flex items-center justify-between border-b px-4 py-4 lg:px-20">
      <h1 className="text-lg font-semibold">Employee Management System</h1>
      <div>
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
              <Sheet>
                <SheetTrigger>
                  <RxHamburgerMenu size={24} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
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
