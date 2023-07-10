"use client"
import { Menu, MenuButton, MenuList, MenuItem, Spinner } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutations } from "@/functions/mutations";
import DialogModal from "../Modal";
import EditList from "./components/EditList";
export default function ListOptions({ id, name }: { id: string; name: string }) {
  const {
    mutateAsync: trashList,
    isSuccess: isListTrashSuccess,
    isLoading: isListTrashLoading,
    isError: isListTrashError,
    error: listTrashError,
  } = useMutations("trash list", "lists", "", "", id, "PUT");
  if (isListTrashError) {
    console.error(listTrashError);
  }
  if (isListTrashSuccess) {
    console.log("succesfully trashed", id);
  }
  return (
    <Menu key={id}>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
          <EditList id={id} name={name} />
        <DialogModal
          type="menu"
          desc={"Delete"}
          func={trashList}
          isSuccess={isListTrashSuccess}
          isLoading={isListTrashLoading}
          confirmation={`Move list to trash?`}
        />
      </MenuList>
    </Menu>
  );
}
