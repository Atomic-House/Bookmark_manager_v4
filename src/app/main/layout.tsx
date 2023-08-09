import "./globals.css";
import Providers from "@/app/providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
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
  if (!session) redirect("/user/auth/signin");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Sidebar>
            <NextTopLoader />
            {children}
            <Navbar />
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}

