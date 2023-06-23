import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
// import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
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
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const body = req.body;
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: body?.email,
    //       },
    //     });
    //     if (user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
