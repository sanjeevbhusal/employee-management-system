import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getSession() {
  const session = await getServerSession(authOptions);
  console.log("session", { session });
  return session?.user;
}

export { getSession };
