import Providers from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = {
  title: "Login or Signup",
  description: "Created by Mir Saheb Ali",
  icons: {
    icon: "/favicon.ico",
  },
};
const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
