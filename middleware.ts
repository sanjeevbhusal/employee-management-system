import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith("/api/auth/signin") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/all-employees") && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/invite-user") && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/create-employee") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/all-employees",
    "/invite-user",
    "/create-employee",
    "/api/auth/signin",
  ],
};
