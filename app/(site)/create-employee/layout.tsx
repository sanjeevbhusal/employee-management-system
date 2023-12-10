import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Employee",
  description: "This is a employee management system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
