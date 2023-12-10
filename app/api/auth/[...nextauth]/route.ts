import { prisma } from "@/app/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "EmployeeHub",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
