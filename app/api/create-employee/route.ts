import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dto = await request.json();

  await prisma.user.create({
    data: dto,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
