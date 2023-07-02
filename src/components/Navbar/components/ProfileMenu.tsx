"use client";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
import { Progress } from "@chakra-ui/react";
export default function ProfileMenu({ display }: { display: JSX.Element }) {
  const { data: session } = useSession();
  const id = useAppSelector((state) => state.workspace.id);
  const { mutate, mutateAsync, isSuccess, isLoading } = useMutations(
    "delete workspace",
    "workspace",
    "",
    id,
    "DELETE"
  );
  return (
    <Menu>
      <MenuButton>{display}</MenuButton>
      <MenuList>
        <MenuGroup title={session?.user?.name ? session.user.name : "Profile"}>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
          <MenuItem onClick={(e) => mutateAsync(e)}>
            {isLoading && <Progress size={`md`} isIndeterminate />}
            Delete Workspace
          </MenuItem>
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
