import { prisma } from "../lib/db";

async function getDepartments() {
  return await prisma.department.findMany({});
}

export { getDepartments };
