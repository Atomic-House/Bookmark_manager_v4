"use client";
import { IconContext } from "@/context/icon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { ReactNode, useContext, useState } from "react";

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
}: {
  trigger?: string | ReactNode;
}) {
  const { icon, setIcon } = useContext(IconContext);
  return (
    <div className="dropdown">
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
          onEmojiSelect={(e: Icon) => setIcon(e.native)}
        />
      </div>
    </div>
  );
}
