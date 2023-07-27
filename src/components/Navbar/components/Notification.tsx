"use client"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

import { AiOutlineBell } from "@react-icons/all-files/ai/AiOutlineBell";
export default function Notification() {
  return (
    <Menu>
      <MenuButton>
        <AiOutlineBell className="font-extrabold text-2xl" />
      </MenuButton>
      <MenuList>
        <MenuItem as="a" href="#">
        You have 1 new notification
        </MenuItem>
        <MenuItem as="a" href="#">
          You have been added to the team
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
