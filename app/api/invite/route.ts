import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  let payload: { organizationId: string; email: string };
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as {
      organizationId: string;
      email: string;
    };
  } catch (error) {
    return NextResponse.json(
      { error: "JWT Verification failed" },
      { status: 400 },
    );
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: parseInt(payload.organizationId),
    },
  });

  return NextResponse.json({
    organizationName: organization?.name,
    email: payload.email,
  });
}
