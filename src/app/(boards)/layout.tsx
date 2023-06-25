import "./globals.css";
import Providers from "../providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Bookmark Manager",
  description: "Created by Mir Saheb Ali",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return (
    <html lang="en">
      <body>
        <Providers>
          <Sidebar>
            {children}
            <Navbar />
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}
