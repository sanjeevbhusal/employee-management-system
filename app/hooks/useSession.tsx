"use client";

import { useSession as useClientSession } from "next-auth/react";

function useSession() {
  const session = useClientSession();
  return session?.data?.user;
}

export { useSession };
