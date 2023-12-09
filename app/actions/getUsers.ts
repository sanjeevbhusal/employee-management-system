import { prisma } from "../lib/db";

async function getUsers(
  query: string | undefined,
  departmentId: number | undefined,
  gender: string | undefined,
  role: string | undefined,
  page: number,
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

  if (gender) {
    filter["gender"] = gender;
  }

  if (role) {
    filter["role"] = {
      name: role,
    };
  }

  const totalMatches = await prisma.user.count({
    where: filter,
  });

  const users = await prisma.user.findMany({
    where: filter,
    take: 10,
    skip: 10 * (page - 1),
  });

  return {
    totalMatches,
    users,
  };
}

export { getUsers };
