import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../context/SessionProvider";
import NavBar from "../components/NavBar";
import { Toaster } from "@/app/components/ui/toaster";
import { getSession } from "../actions/getSession";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "This is a employee management system",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Toaster />
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
