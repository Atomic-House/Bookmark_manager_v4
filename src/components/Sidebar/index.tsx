"use client";
import useWindowDimension from "@/hooks/window";
import DrawerMenu from "../Drawer";
import MySidebar from "./components/CustomSidebar";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimension();

  return (
    <div className="flex">
      {width > 768 ? <MySidebar /> : <DrawerMenu />}
      <main>{children}</main>
    </div>
  );
}
