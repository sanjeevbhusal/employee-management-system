import { prisma } from "../lib/db";

async function getUsers(
  query: string | undefined,
  departmentId: number | undefined,
) {
  const filter: Record<any, any> = {};

  if (query) {
    filter["name"] = {
      startsWith: query,
      mode: "insensitive",
    };
  }

  if (departmentId) {
    filter["departmentId"] = departmentId;
  }

  return await prisma.user.findMany({
    where: filter,
  });
}

export { getUsers };
