"use client";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
} from "@chakra-ui/react";
import DialogModal from "@/components/Modal";
import { useChangeColor } from "@/functions/mutations";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { BsFillCalendarFill } from "@react-icons/all-files/bs/BsFillCalendarFill";
import { BsTrash2 } from "@react-icons/all-files/bs/BsTrash2";
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze";
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BsLayoutSidebar } from "@react-icons/all-files/bs/BsLayoutSidebar";
import { MouseEventHandler, useContext } from "react";
import { ListColorContext } from "@/components/context/ListColorContext";
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
  "pink",
  "gray",
  "cyan",
];
export default function EditListOptions({
  onClickDelete,
  isSuccess,
  isLoading,
  id,
}: {
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  isSuccess: boolean;
  id: string;
}) {
  const { setListColor } = useContext(ListColorContext);
  const { mutateAsync: changeColor } = useChangeColor();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        w={"fit-content"}
        colorScheme="blue"
        variant={"unstyled"}
      >
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <BiPencil />
            Edit
          </MenuItem>
        </MenuGroup>

        <MenuDivider />
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <BiAlarmSnooze />
            Add Snooze
          </MenuItem>
          <MenuItem className="flex gap-2">
            <BsFillCalendarFill />
            Add Reminder
          </MenuItem>
        </MenuGroup>

        <MenuDivider />
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <AiOutlineStar />
            Mark as favorite
          </MenuItem>
          <MenuItem className="flex gap-2">
            <BiDuplicate />
            Duplicate
          </MenuItem>
          <MenuItem className="flex gap-2">
            <BsLayoutSidebar />
            Collapse
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <DialogModal
            type="menu"
            func={onClickDelete}
            confirmation={"Trash list?"}
            desc={
              <>
                <BsTrash2 /> Move to trash
              </>
            }
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </MenuGroup>
        <MenuDivider />
        <MenuOptionGroup>
          <div className="flex justify-center font-bold">List color</div>
          <div className="grid grid-cols-5 gap-2 place-items-center m-2">
            {colors.map((color, index) => (
              <MenuItemOption
                onClick={() => {
                  changeColor({ id, color });
                  setListColor(color);
                }}
                key={index}
                p={2}
                value={color}
                bg={color}
              ></MenuItemOption>
            ))}
          </div>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
