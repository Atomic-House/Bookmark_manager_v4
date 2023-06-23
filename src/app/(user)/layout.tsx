import Providers from "../providers";
import "./globals.css"
export const metadata = {
  title: "Login or Signup",
  description: "Created by Mir Saheb Ali",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
