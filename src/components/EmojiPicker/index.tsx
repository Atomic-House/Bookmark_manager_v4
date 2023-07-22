"use client";
import dynamic from "next/dynamic";
import { FcList } from "react-icons/fc";
import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ListEmojiContext } from "../context/ListEmojiContext";
import { useAddEmojiToList, useMutations } from "@/functions/mutations";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);

export default function EmojiSelect(
  { id, name, color }: { id: string; name: string; color: string },
) {
  const { listEmoji, setListEmoji } = useContext(ListEmojiContext);
  const { mutateAsync, isLoading, isSuccess } = useAddEmojiToList(id, {
    name,
    color,
    emoji: listEmoji,
  });

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button variant={"unstyled"} fontSize={"2xl"}>
          <div className="relative flex justify-center ">
         <div> {listEmoji ? listEmoji : <FcList />}
         </div>
            <div className="absolute">
          {isLoading?<Spinner opacity={0.5} /> : ""}
          </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
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
