import { getSession } from "@/app/actions/getSession";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dto = await request.json();
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to invite users" },
      { status: 401 },
    );
  }

  await prisma.invitation.create({
    data: {
      ...dto,
      invitedByUserId: user.id,
    },
  });
  return NextResponse.json({ success: true }, { status: 201 });
}
