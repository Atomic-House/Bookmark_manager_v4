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
import DialogModal from "@/components/Modal";
import {
  BsUpload,
  BsCalendar4Event,
  BsTrash3,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { PiShare } from "react-icons/pi";
import { BiAlarmSnooze, BiDuplicate, BiPencil } from "react-icons/bi";
import { AiOutlineCi, AiOutlineStar } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { MouseEventHandler } from "react";
export default function EditListOptions({
  onClickDelete,
  isSuccess,
  isLoading,
}: {
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue" variant={"unstyled"}>
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
        <MenuGroup>
          <DialogModal
            type="menu"
            func={onClickDelete}
            confirmation={"Trash list?"}
            desc={
              <>
                <BsTrash3 /> Move to trash
              </>
            }
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
