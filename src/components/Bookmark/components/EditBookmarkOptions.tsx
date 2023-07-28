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
} from "@chakra-ui/react";
import { BsUpload } from "@react-icons/all-files/bs/BsUpload";
import { BsTrash2 } from "@react-icons/all-files/bs/BsTrash2";
import { BsFillCalendarFill } from "@react-icons/all-files/bs/BsFillCalendarFill";
import { FaShareSquare } from "@react-icons/all-files/fa/FaShareSquare";
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze";
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BsLayoutTextSidebarReverse } from "@react-icons/all-files/bs/BsLayoutTextSidebarReverse";
import { MouseEventHandler } from "react";
const hexArray = [
  "#f08dcc",
  "#f2f595",
  "#f595a0",
  "#95f5b4",
  "#f5bf95",
  "#95e5f5",
  "#86708a",
  "#bfccad",
  "#f0c5d4",
  "#8db3f0",
];
export default function EditBookmarkOptions({
  onClickDelete,
}: {
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue" variant={"unstyled"}>
        <BiPencil />
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem className="flex gap-2">
            <BsUpload />
            Upload Link
          </MenuItem>
          <MenuItem className="flex gap-2">
            <FaShareSquare />
            Share
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
            <BsLayoutTextSidebarReverse />
            Collapse
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem className="flex gap-2" onClick={onClickDelete}>
          <BsTrash2 /> Move to trash
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup>
          <div className="flex justify-center font-bold">List color</div>
          <div className="grid grid-cols-5 gap-2 place-items-center m-2">
            {hexArray.map((hex) => (
              <MenuItemOption
                // onClick={() => console.log("Selected", hex)}
                key={hex}
                p={2}
                value={hex}
                bg={hex}
              ></MenuItemOption>
            ))}
          </div>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
