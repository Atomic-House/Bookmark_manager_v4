"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { ReactNode } from "react";

interface Icon {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
}
export default function IconPicker({
  trigger,
  onEmojiSelect,
  icon,
}: {
  trigger?: string | ReactNode;
  onEmojiSelect?: (e: Icon) => void;
  icon: string;
}) {
  return (
    <div className="dropdown dropdown-hover">
      <span
        tabIndex={0}
        className="p-2  cursor-pointer hover:bg-black duration-300"
      >
        {icon ? icon : trigger}
      </span>
      <div className="dropdown-content menu z-[100]" tabIndex={0}>
        <Picker
          emojiButtonSize={36}
          data={data}
          onEmojiSelect={onEmojiSelect}
        />
      </div>
    </div>
  );
}
