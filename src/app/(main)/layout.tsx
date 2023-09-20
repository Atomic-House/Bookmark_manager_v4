import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/Theme/themeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description: "Created by Mir Saheb Ali",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Sidebar>
            <div className="flex flex-col items-end">
              <div className="hidden">
                <ThemeProvider />
              </div>

              <div className="">{children}</div>
            </div>
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}
