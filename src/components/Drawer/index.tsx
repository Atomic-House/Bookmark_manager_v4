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
  useColorModeValue,
  useColorModePreference,
} from "@chakra-ui/react";
import UserTabs from "../Tabs";
import PopoverButton from "./components/Popover";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { toggleTheme } from "@/slices/themeSlice";

export default function DrawerMenu() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //_______ Window Resizing for Responsiveness______
  useEffect(() => {
    
  })
  //_________END_______________________________
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonColor = useColorModeValue("black", "white");
  const dispatch = useAppDispatch();
  // Swithing theme for ChakraUI and TailwindCSS
  const { toggleColorMode, colorMode } = useColorMode();
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }, []);
  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  const handleSwitchTheme = () => {
    dispatch(toggleTheme(colorMode === "dark" ? "light" : "dark"));
  };
  // _______END______________
  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
          handleSwitchTheme();
        }}
        bg={buttonColor}
      >
        <GiHamburgerMenu className="text-white dark:text-black" />
      </Button>

      <Drawer isOpen={isOpen} placement={"bottom"} onClose={onClose}>
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
            <PopoverButton onClose={onClose} onConfirm={onClose} />
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
