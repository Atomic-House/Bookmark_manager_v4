"use client";
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
import { BsUpload, BsCalendar4Event, BsTrash3 } from "react-icons/bs";
import { PiShare } from "react-icons/pi";
import { BiAlarmSnooze, BiDuplicate, BiPencil } from "react-icons/bi";
import { AiOutlineCi, AiOutlineStar } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
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
            <PiShare />
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
            <BsCalendar4Event />
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
            <TbLayoutSidebarLeftCollapse />
            Collapse
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem className="flex gap-2" onClick={onClickDelete}>
          <BsTrash3 /> Move to trash
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup>
          <div className="flex justify-center font-bold">List color</div>
          <div className="grid grid-cols-5 gap-2 place-items-center m-2">
            {hexArray.map((hex) => (
              <MenuItemOption
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
