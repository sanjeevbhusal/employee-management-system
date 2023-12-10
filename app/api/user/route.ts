import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const dto = await request.json();
  const token = request.nextUrl.searchParams.get("invitationToken");

  if (!token) {
    return NextResponse.json({ status: "error" }, { status: 400 });
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

  if (invitation.email !== dto.email || invitation.used) {
    return NextResponse.json(
      { error: "Invitation is invalid" },
      { status: 404 },
    );
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await prisma.user.create({
    data: {
      ...dto,
      password: hashedPassword,
      organizationId: invitation.organizationId,
    },
  });

  await prisma.invitation.update({
    where: {
      id: invitation.id,
    },
    data: {
      used: true,
    },
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bhusalsanjeev23@gmail.com",
      pass: "vzlhsunaiyzadfkc",
    },
  });

  transporter.sendMail({
    from: "Sanjeev Bhusal <bhusalsanjeev23@gmail.com>",
    to: dto.email as string,
    subject: "Invitation to EmployeeHub",
    text: `Congratulation, You are now officially part of ${invitation.organization?.name}. The next step is to login to EmployeeHub and know more about your organization and its people.\n
    Click this link to login to the application \n
    http://localhost:3000`,
  });

  return NextResponse.json({ status: "success" }, { status: 201 });
}
