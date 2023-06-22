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
export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimension();
  const buttonColor = useColorModeValue("black", "white");
  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
        }}
        bg={buttonColor}
      >
        <GiHamburgerMenu className="text-white dark:text-black" />
      </Button>

      <Drawer
        isOpen={isOpen}
        closeOnEsc
        placement={width > 768 ? "left" : "bottom"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div>Hello Mir!</div>
            <SwitchButton/>
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
