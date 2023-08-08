"use client"
//theme switcher for both chakra and tailwindcss component
import useTheme from "@/hooks/theme";
import { Switch } from "@chakra-ui/react";
export default function SwitchButton() {
  const { handleSwitchTheme } = useTheme();

  return <Switch onChange={handleSwitchTheme}></Switch>;
}
