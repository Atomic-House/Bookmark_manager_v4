"use client";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineBell } from "@react-icons/all-files/ai/AiOutlineBell";
export default function Notification() {
  return (
    <Menu>
      <MenuButton>
        <AiOutlineBell className="text-2xl font-extrabold" />
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
