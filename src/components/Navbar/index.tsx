"use client";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";

export default function Navbar() {
  return (
    <div className="navbar gap-2  dark:bg-base-100 shadow-lg rounded-full">
      <div className="navbar-start">
        <Search />
      </div>
      <div className="navbar-end">
        <Settings />
        <Notifications />
        <Profile />
      </div>
    </div>
  );
}
