"use client";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useMutations } from "@/functions/mutations";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineStar,
  AiOutlineUser,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { LiaPuzzlePieceSolid } from "react-icons/lia";
import { BiHelpCircle, BiTrash } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
export default function ProfileMenu({
  display,
  image,
}: {
  display: JSX.Element;
  image: string | undefined;
}) {
  const { data: session } = useSession();
  const id = useAppSelector((state) => state.workspace.id);
  const { mutateAsync, isSuccess, isLoading } = useMutations(
    "delete workspace",
    "workspaces",
    "",
    "",
    id,
    "DELETE",
  );

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>{display}</MenuButton>
      <MenuList flex={1} justifyContent={"center"} mt={0} rounded={"md"}>
        <div className="w-full relative mb-7 mt-0">
          <Image
            src={
              "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80"
            }
            width={100}
            className=" relative items-center object-cover w-full h-20"
            height={20}
            alt="image"
          />
          <Avatar src={image} position={"absolute"} left={"20"} bottom={"-6"} />
        </div>
        <MenuGroup position={"relative"}>
          <MenuItem as={Link} href={"/profile"} className="flex gap-2">
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
            <LiaPuzzlePieceSolid />
            Add browser extension
          </MenuItem>
          <MenuItem className="flex gap-2">
            <BiTrash />
            Delete this workspace
          </MenuItem>
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
