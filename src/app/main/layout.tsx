import "./globals.css";
import Providers from "@/app/providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Bookmark Manager",
  description: "Created by Mir Saheb Ali",
  icons: { icon: "/favicon.ico" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Sends the user to signin page if not logged in
  const session = await getServerSession(authOptions);
  const workspaces = await prisma.workspace.findMany({
    where: {
      email: session?.user?.email,
    },
    include: {
      inbox: {
        include: {
          tabs: {
            include: {
              listPrefs: true,
              lists: {
                include: {
                  bookmarks: true,
                },
              },
            },
          },
        },
      },
      boards: {
        include: {
          tabs: {
            include: {
              listPrefs: true,
              lists: {
                include: {
                  bookmarks: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session) redirect("/user/auth/signin");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Sidebar ws={workspaces}>
            <NextTopLoader />
            {children}
            <Navbar />
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}
