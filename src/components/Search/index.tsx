"use client";
import { BiSearch } from "react-icons/bi";
import { InputGroup, Input, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import useWindowDimension from "@/hooks/window";
export default function NavSearch({ iconPosition }: { iconPosition: "left" | "right" }) {
  const { width } = useWindowDimension();

  return (
    <div>
      <InputGroup>
        {iconPosition === "left" && (
          <InputLeftAddon>
            <BiSearch />
          </InputLeftAddon>
        )}
        <Input
          className={width > 768 ? "w-full" : "w-fit"}
          placeholder="search lists, tags ,..."
          type="text"
        />
        {iconPosition === "right" && (
          <InputRightAddon>
            <BiSearch />
          </InputRightAddon>
        )}
      </InputGroup>
    </div>
  );
}
