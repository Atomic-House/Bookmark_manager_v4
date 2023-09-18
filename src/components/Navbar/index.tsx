"use client";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";

export default function Navbar() {
  return (
    <div className="flex items-center gap-2 bg-slate-900 w-fit py-1 rounded-full px-4">
      <Search />
      <Settings />
      <Notifications />
      <Profile />
    </div>
  );
}
