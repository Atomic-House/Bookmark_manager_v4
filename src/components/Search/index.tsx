"use client";
import { BiSearch } from "react-icons/bi";
import { InputGroup, Input, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import useWindowDimension from "@/hooks/window";
export default function NavSearch({ iconPosition }: { iconPosition: "left" | "right" }) {
  const { width } = useWindowDimension();

  return (
    <div>
      <InputGroup>
        {/* {iconPosition === "left" && <InputLeftAddon></InputLeftAddon>} */}
        <div className="bg-slate-200 flex items-center p-2 px-4 rounded-full">
          <BiSearch />
          <Input
            w={width > 768 ? "full" : "fit-content"}
            border={0}
            placeholder="search lists, tags ,..."
            type="text"
          />
        </div>
        {/* {iconPosition === "right" && ( */}
        {/*   <InputRightAddon> */}
        {/*     <BiSearch /> */}
        {/*   </InputRightAddon> */}
        {/* )} */}
      </InputGroup>
    </div>
  );
}
