"use client";
import { useState, useEffect } from "react";
import { BsSun } from "@react-icons/all-files/bs/BsSun";
import { BsMoon } from "@react-icons/all-files/bs/BsMoon";
export default function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.localStorage.getItem("theme") || "light";
  });
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on dark:text-white">
        <BsSun />
      </div>
      <div className="swap-off text-black ">
        <BsMoon />
      </div>
    </label>
  );
}
