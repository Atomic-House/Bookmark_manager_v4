"use client"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
export default function ProfileMenu({ display }: { display: JSX.Element }) {
  const { data: session } = useSession();
  return (
    <Menu>
      <MenuButton>{display}</MenuButton>
      <MenuList>
        <MenuGroup title={session?.user?.name ? session.user.name : "Profile"}>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
          <MenuItem>Trash</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
          <MenuItem onClick={() => signOut()}>Log out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
