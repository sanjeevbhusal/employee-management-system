import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/db";

// We should know who the organization was that created the token as well as the email the token is intended to.

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("invitationToken");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  let payload: { invitationId: string };
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as {
      invitationId: string;
    };
  } catch (error) {
    return NextResponse.json(
      { error: "JWT Verification failed" },
      { status: 400 },
    );
  }

  const invitation = await prisma.invitation.findUnique({
    where: {
      id: payload.invitationId,
    },
    include: {
      organization: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Invitation not found" },
      { status: 404 },
    );
  }

  if (invitation.used) {
    return NextResponse.json(
      { error: "Invitation already used" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    organizationName: invitation.organization?.name,
    email: invitation.email,
  });
}
