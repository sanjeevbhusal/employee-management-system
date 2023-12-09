import { getSession } from "@/app/actions/getSession";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// A verification link should be sent to the user.
// Upon clicking the link, we should figure out which organization invited the user.
// To do that, you can create a jwt token with the organization id and send it as a query param.
// The link should be something like this: https://employeehub.vercel.app/invite?token=jwt_token
// When the user clicks the link, we should verify the token and get the organization id.

export async function POST(request: NextRequest) {
  const dto = await request.json();
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to invite users" },
      { status: 401 },
    );
  }

  const _user = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  await prisma.invitation.create({
    data: {
      ...dto,
      invitedByUserId: user.id,
      organizationId: _user?.organizationId,
    },
  });

  const token = jwt.sign(
    { organizationId: _user?.organizationId, email: dto.email },
    process.env.NEXTAUTH_SECRET as string,
  );

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
    text: `Please click this link to register your account\n http://localhost:3000/create-employee?token=${token}`,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
