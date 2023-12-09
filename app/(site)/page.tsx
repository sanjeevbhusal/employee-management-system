// import { getSession } from "./actions/getSession";

// export default async function Home() {
//   const session = await getSession();
//   console.log(session);
//   return <h1>Hello world</h1>;
// }

"use client";

import { useSession } from "../hooks/useSession";

export default function Home() {
  const session = useSession();
  console.log(session);
  return <h1>Hello world</h1>;
}
