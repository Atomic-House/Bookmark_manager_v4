import "./globals.css";
import Providers from "./providers";
import DrawerMenu from "@/components/Drawer";
export const metadata = {
  title: "Bookmark Manager",
  description: "Created by Mir Saheb Ali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <DrawerMenu />
        </Providers>
      </body>
    </html>
  );
}
