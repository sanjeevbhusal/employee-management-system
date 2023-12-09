import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../context/SessionProvider";
import NavBar from "../components/NavBar";
import { Toaster } from "@/app/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "This is a employee management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
