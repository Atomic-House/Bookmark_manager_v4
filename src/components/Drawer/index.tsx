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
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import UserTabs from "../Tabs";
import PopoverButton from "./components/Popover";
import { GiHamburgerMenu } from "react-icons/gi";
export default function DrawerMenu() {
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <button onClick={onOpen} className="bg-[#ddecfd] dark:bg-[#010402] p-2 rounded-md">
        <GiHamburgerMenu className="text-black" />
      </button>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div>Hello Mir!</div>
            <Switch onChange={toggleColorMode}></Switch>
          </DrawerHeader>

          <DrawerBody>
            <UserTabs />
          </DrawerBody>

          <DrawerFooter>
         <PopoverButton onClose={onClose}/> 
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
