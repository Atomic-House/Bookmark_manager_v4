"use client"
import dynamic from "next/dynamic";
import EmojiPicker from "emoji-picker-react";
import { FcList } from "react-icons/fc";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ListEmojiContext } from "../context/ListEmojiContext";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);

export default function EmojiSelect() {
  const { listEmoji, setListEmoji } = useContext(ListEmojiContext);
  console.log(listEmoji);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"unstyled"} fontSize={"2xl"}>{listEmoji ? listEmoji : <FcList />}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>
          <Picker lazyLoadEmojis onEmojiClick={(emojiData) => setListEmoji(emojiData.emoji)} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
