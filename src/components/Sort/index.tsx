"use client";
import { FaSortAmountDownAlt } from "@react-icons/all-files/fa/FaSortAmountDownAlt";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ListPrefContext } from "../context/ListPrefContext";
export default function Sort() {
  const [selected, setSelected] = useState("");
  const { listPrefs, setListPrefs } = useContext(ListPrefContext);
  const options: {
    name: string;
    icon: JSX.Element;
    selected: boolean;
    value: "a_z" | "z_a" | "oldest" | "newest";
  }[] = [
    {
      name: "A-Z",
      icon: <FcAlphabeticalSortingAz />,
      selected: false,
      value: "a_z",
    },
    {
      name: "Z-A",
      icon: <FcAlphabeticalSortingZa />,
      selected: false,
      value: "z_a",
    },
    {
      name: "New to Old",
      icon: <BsSortNumericDown />,
      selected: false,
      value: "newest",
    },
    {
      name: "Old to New",
      icon: <BsSortNumericUp />,
      selected: false,
      value: "oldest",
    },
  ];

  return (
    <Menu>
      <MenuButton as={Box} p={1} bg={"silver"} rounded={"md"} w={"fit-content"}>
        <FaSortAmountDownAlt className="text-slate-800" />
      </MenuButton>
      <MenuList p={4} h={"33vh"}>
        <MenuGroup>
          Sort
          <p className="text-xs">Choose any sort you want</p>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <RadioGroup onChange={setSelected} value={selected}>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setListPrefs({
                    ...listPrefs,
                    sort: option.value,
                  });
                  setSelected(option.value);
                }}
                className={`flex justify-between hover:text-[#422AFB] duration-300  ${
                  selected === option.value ? "text-[#422AFB]" : ""
                }`}
              >
                <div className="flex justify-center items-center gap-5 ">
                  {option.icon}
                  {option.name}
                </div>
                <Radio value={option.value} />
              </div>
            ))}
          </RadioGroup>
        </MenuGroup>
        <MenuGroup>
          <div className="float-right flex gap-5 mt-7">
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
