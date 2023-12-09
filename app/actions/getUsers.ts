import { prisma } from "../lib/db";

async function getUsers(query: string) {
  return await prisma.user.findMany({
    where: {
      name: {
        startsWith: query,
        mode: "insensitive",
      },
    },
  });
}

export { getUsers };
