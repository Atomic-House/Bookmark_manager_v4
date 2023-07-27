"use client";

import { BiFilterAlt } from "@react-icons/all-files/bi/BiFilterAlt";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ListPrefContext } from "../context/ListPrefContext";
import { useState } from "react";
const tags = [
  { name: "tag 1", color: "pink" },
  { name: "tag 2", color: "cyan" },
  { name: "tag 3", color: "yellow" },
  { name: "tag 4", color: "blue" },
  { name: "tag 5", color: "green" },
  { name: "tag 6", color: "red" },
];
export default function Filter() {
  const { listPrefs, setListPrefs } = useContext(ListPrefContext);
  const [selectedTags, setSelectedTags] = useState<
    { name: string; color: string }[]
  >([{ name: "", color: "" }]);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  // console.log(selectedTags);
  useEffect(() => {
    setListPrefs({
      ...listPrefs,
      filter: {
        tags: [...selectedTags.map((t) => t.name)],
        linksType: [...selectedLinks],
      },
    });
  }, [selectedTags, selectedLinks,listPrefs,setListPrefs]);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Box}
        bg={"silver"}
        textColor={"slategray.900"}
        w={"fit-content"}
        p={1}
        rounded={"md"}
      >
        <BiFilterAlt />
      </MenuButton>
      <MenuList p={4} w={"300px"} h={"50vh"}>
        <MenuGroup>
          Filter
          <p className="text-xs">Filter through</p>
        </MenuGroup>
        <MenuGroup flex={1}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch className="flex justify-center items-center" />
            </InputLeftElement>
            <Input type="text" placeholder="Search" border="none" />
          </InputGroup>
        </MenuGroup>
        <MenuGroup>
          <MenuItem>
            <div className="float-left">Top Tags</div>
          </MenuItem>
          <Flex w={"fit-content"} gap={2} wrap={"wrap"}>
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedTags([...new Set([...selectedTags, tag])]);
                  }}
                  className="border-2 border-slate-500 rounded-full text-xs p-1 flex justify-center items-center cursor-pointer"
                >
                  <Box
                    bg={tag.color}
                    w="8px"
                    h="8px"
                    mr="4px"
                    borderRadius="full"
                  ></Box>
                  {tag.name}
                </div>
              );
            })}
          </Flex>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <CheckboxGroup
            onChange={(e) => {
              setSelectedLinks([...e.map((e) => e.toString().valueOf())]);
            }}
            colorScheme="blue"
          >
            <Checkbox value={"Most"}>Most viewed</Checkbox>
            <Checkbox value={"Broken"}>Broken links</Checkbox>
            <Checkbox value={"Duplicate"}>Duplicate links</Checkbox>
          </CheckboxGroup>
        </MenuGroup>

        <MenuDivider />
        <MenuGroup>
          <div className="float-right flex gap-5">
            <button className="hover:text-red-900 duration-300 ">Reset</button>
            <button className="bg-[#422AFB] py-2 rounded-full px-9 text-white hover:bg-blue-600 duration-300">
              Apply
            </button>
          </div>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
