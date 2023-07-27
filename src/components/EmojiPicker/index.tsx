"use client";
import dynamic from "next/dynamic";
import { FcList } from "@react-icons/all-files/fc/FcList";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ListEmojiContext } from "../context/ListEmojiContext";
import { useAddEmojiToList } from "@/functions/mutations";
import { ListsWithBookmarks } from "@/types";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);
export default function EmojiSelect({
  id,
  name,
  color,
  emoji,
  ...listProps
}: ListsWithBookmarks) {
  const { listEmoji, setListEmoji } = useContext(ListEmojiContext);
  const { mutateAsync, isLoading } = useAddEmojiToList(id, {
    name,
    color,
    emoji: listEmoji,
  });

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button variant={"unstyled"} fontSize={"2xl"}>
          <div className="relative flex justify-center ">
            <div>{listEmoji ? listEmoji : emoji ? emoji : <FcList />}</div>
            <div className="absolute">
              {isLoading ? <Spinner opacity={0.5} /> : ""}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={20}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Select Icon</PopoverHeader>
        <PopoverBody>
          <Picker
            lazyLoadEmojis
            onEmojiClick={(emojiData) => {
              mutateAsync();
              setListEmoji(emojiData.emoji);
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
