import { toggleTheme } from "@/slices/themeSlice";
import { useAppDispatch } from "@/store/hooks";
import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
//Handles toggle theme for tailwindcss and react component together
export default function useTheme() {
  const dispatch = useAppDispatch();
  const { toggleColorMode, colorMode } = useColorMode();
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }, []);
  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  const handleSwitchTheme = () => {
    dispatch(toggleTheme(colorMode === "dark" ? "light" : "dark"));
    toggleColorMode()
  };
  return { handleSwitchTheme};
}
