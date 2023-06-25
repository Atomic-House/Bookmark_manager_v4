import Providers from "../providers";
import "./globals.css";
import Head from "next/head";
export const metadata = {
  title: "Login or Signup",
  description: "Created by Mir Saheb Ali",
  icons: {
 icon: '/favicon.ico'   
  }
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
<link rel="icon" href="/favicon.ico" type="image/png" sizes="32x32" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
