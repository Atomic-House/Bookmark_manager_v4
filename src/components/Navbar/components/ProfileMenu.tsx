"use client";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Spinner,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
import { Progress } from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import DialogModal from "@/components/Modal";
export default function ProfileMenu({ display }: { display: JSX.Element }) {
  const { data: session } = useSession();
  const id = useAppSelector((state) => state.workspace.id);
  const { mutateAsync, isSuccess, isLoading } = useMutations(
    "delete workspace",
    "workspaces",
    "",
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
          <DialogModal
            desc={"Delete Workspace"}
            type="menu"
            func={mutateAsync}
            confirmation={`Are you sure you want to delete this workspace?`}
            isSuccess={isSuccess}
            isLoading={isLoading}
          />
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
