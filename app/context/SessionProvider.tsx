"use client";

import { SessionProvider as Session } from "next-auth/react";
import { ReactNode } from "react";

function SessionProvider({ children }: { children: ReactNode }) {
  return <Session>{children}</Session>;
}

export { SessionProvider };
