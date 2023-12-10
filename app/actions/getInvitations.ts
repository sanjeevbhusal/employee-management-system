import { prisma } from "../lib/db";

async function getInvitations() {
  // const totalMatches = await prisma.user.count({
  //   where: filter,
  // });

  const invitations = await prisma.invitation.findMany({});

  return {
    invitations,
  };
}

export { getInvitations };
