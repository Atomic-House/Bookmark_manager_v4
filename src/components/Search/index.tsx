"use client"

import { BiSearch } from "react-icons/bi";
import { InputGroup, Input, InputLeftAddon } from "@chakra-ui/react";
export default function NavSearch() {
  return (
    <div>
      <InputGroup>
        <InputLeftAddon>
          <BiSearch />
        </InputLeftAddon>
        <Input placeholder="search bookmarks, tabs, lists, etc..."/>
      </InputGroup>
    </div>
  );
}
