import { type ClassValue, clsx } from "clsx";
import { User } from "next-auth";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getUserInitials(user: User) {
  if (!user.name) return "";

  const nameParts = user.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
}

export { cn, getUserInitials };
