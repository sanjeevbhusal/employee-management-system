import { prisma } from "../lib/db";

async function getRoles() {
  return await prisma.role.findMany({});
}

export { getRoles };
