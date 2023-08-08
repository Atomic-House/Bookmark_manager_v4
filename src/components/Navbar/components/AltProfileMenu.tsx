//Profile component rendered in /main/profile route

"use client";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiOutlineExclamationCircle } from "@react-icons/all-files/ai/AiOutlineExclamationCircle";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { IoExtensionPuzzle } from "@react-icons/all-files/io5/IoExtensionPuzzle";
import { BiTrash } from "@react-icons/all-files/bi/BiTrash";
import { BiHelpCircle } from "@react-icons/all-files/bi/BiHelpCircle";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import DialogModal from "@/components/Modal";
import { redirect } from "next/navigation";
export default function ProfileMenu({
  display,
  image,
  background,
}: {
  display: JSX.Element;
  image: string | undefined;
  background?: string | null | undefined;
}) {
  const id = useAppSelector((state) => state.workspace.id);
  const inboxId = useAppSelector((state) => state.workspace.inboxId);
  const { mutateAsync, isSuccess, isLoading } = useMutations(
    "delete workspace",
    "workspaces",
    "",
    "",
    "",
    `${id}/${inboxId}`,
    "DELETE",
  );

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>{display}</MenuButton>
      <MenuList flex={1} justifyContent={"center"} mt={0} rounded={"md"}>
        <div className="relative mb-7 w-full">
          <Image
            onClick={() => redirect("/main/profile")}
            src={
              background
                ? background
                : "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80"
            }
            width={100}
            className="object-cover relative items-center w-full h-20 rounded"
            height={30}
            alt="image"
          />
          <Avatar src={image} position={"absolute"} left={"20"} bottom={"-6"} />
        </div>
        <MenuGroup position={"relative"}>
          <MenuItem as={Link} href={"/main/profile"} className="flex gap-2">
            <AiOutlineUser />
            Account Setting
          </MenuItem>
          <MenuItem className="flex gap-2">
            <AiOutlineStar /> Favorites
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <IoExtensionPuzzle />
            Add browser extension
          </MenuItem>
          <DialogModal
            desc={
              <>
                <BiTrash />
                Delete this workspace
              </>
            }
            type="menu"
            func={mutateAsync}
            confirmation={`Are you sure you want to delete this workspace?`}
            isSuccess={isSuccess}
            isLoading={isLoading}
          />
        </MenuGroup>

        <MenuDivider />
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <BiHelpCircle />
            Help & Support{" "}
          </MenuItem>
          <MenuItem className="flex gap-2">
            <AiOutlineExclamationCircle />
            About
          </MenuItem>
        </MenuGroup>

        <MenuDivider />
        <MenuGroup>
          <MenuItem onClick={() => signOut()} className="flex gap-2">
            <FiLogOut /> Sign out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
