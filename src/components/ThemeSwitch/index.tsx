"use client"

import useTheme from "@/hooks/theme";
import { Switch } from "@chakra-ui/react";
export default function SwitchButton() {
  const { handleSwitchTheme } = useTheme();

  return <Switch onChange={handleSwitchTheme}></Switch>;
}
