"use client";

import { BiSearch } from "react-icons/bi";
import { InputGroup, Input, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import { useEffect, useState, Fragment } from "react";
import useWindowDimension from "@/hooks/window";
import { Transition } from "@headlessui/react";
export default function NavSearch({
  iconPosition,
}: {
  iconPosition: "left" | "right";
}) {
  const { width } = useWindowDimension();
  const [isDisplaying, setDisplaying] = useState(true);

  return (
    <div>
      <InputGroup onMouseOver={() => setDisplaying(true)} onMouseLeave={() => setDisplaying(false)}>
        {iconPosition === "left" && (
          <InputLeftAddon>
            <BiSearch onClick={() => setDisplaying(!isDisplaying)} />
          </InputLeftAddon>
        )}
        <Transition
          show={isDisplaying}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-0"
        >
          <Input className={width> 768 ? "w-full" : "w-fit"} placeholder="search lists, tags ,..." type="text"/>
        </Transition>
        {iconPosition === "right" && (
          <InputRightAddon>
            <BiSearch onClick={() => setDisplaying(!isDisplaying)} />
          </InputRightAddon>
        )}
      </InputGroup>
    </div>
  );
}
