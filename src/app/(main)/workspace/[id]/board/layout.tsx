import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Sidebar from "@/components/Sidebar";
import ViewTabs from "@/components/View";
import { fakeView } from "@/functions/fakedata";
import Navbar from "@/components/Navbar";
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
      <Providers>
        <body className={inter.className}>
          <Sidebar>
            <div className="flex flex-col items-end">
              <div className="right-0">
                <Navbar />
              </div>
              <div className="">{children}</div>
            </div>
          </Sidebar>
          ,
        </body>
      </Providers>
    </html>
  );
}
