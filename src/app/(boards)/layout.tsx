import "./globals.css";
import Providers from "../providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Bookmark Manager",
  description: "Created by Mir Saheb Ali",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
