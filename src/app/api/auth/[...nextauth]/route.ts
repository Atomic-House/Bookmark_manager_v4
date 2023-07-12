import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.NEXT_PUBLIC_EMAIL_SERVER!,
      from: process.env.NEXT_PUBLIC_EMAIL_FROM!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signin",
  },
  callbacks: {
    async jwt({ trigger, token, user }) {
      if (trigger === "signUp") {
        console.log("New user");
        const defaultWorkspace = await prisma.user.update({
          where: {
            email: user?.email!,
          },
          data: {
            workspaces: {
              create: [
                {
                  email: user?.email!,
                  name: "Default",
                },
              ],
            },
          },
        });
        await prisma.workspace.update({
          where: {
            id: defaultWorkspace?.id,
          },
          data: {
            boards: {
              create: [
                {
                  name: "Inbox",
                },
              ],
            },
          },
        });
        return token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
