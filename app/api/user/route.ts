import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const dto = await request.json();
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ status: "error" }, { status: 400 });
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

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  await prisma.user.create({
    data: {
      ...dto,
      password: hashedPassword,
      organizationId: parseInt(token),
    },
  });

  return NextResponse.json({ status: "success" }, { status: 201 });
}
