"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import UserTabs from "../Tabs";
import PopoverButton from "./components/Popover";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowDimension from "@/hooks/window";
import SwitchButton from "../ThemeSwitch";
import Image from "next/image";
import ProfileMenu from "../Navbar/components/ProfileMenu";
import NavSearch from "../Search";
export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimension();
  return (
    <div>
      <div onClick={onOpen}>
        <Image
          src={
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80"
          }
          alt="logo"
          className="rounded-full"
          width={40}
          height={30}
        />
      </div>
      <Drawer
        isOpen={isOpen}
        closeOnEsc
        placement={width > 768 ? "left" : "bottom"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="flex justify-between">
            <div>
              {" "}
              <div>Hello Mir!</div>
              <div>
                <ProfileMenu display={<div>Account</div>} />
              </div>
              <SwitchButton />
            </div>
            <div className="relative right-6">
              <NavSearch iconPosition="right" />
            </div>
          </DrawerHeader>

          <DrawerBody>
            <UserTabs />
          </DrawerBody>

          <DrawerFooter>
            <PopoverButton onClose={onClose} onConfirm={onClose} />
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
