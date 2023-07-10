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
  useColorMode,
} from "@chakra-ui/react";
import UserTabs from "../Tabs";
import PopoverButton from "./components/Popover";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowDimension from "@/hooks/window";
import SwitchButton from "../ThemeSwitch";
import Image from "next/image";
import ProfileMenu from "../Navbar/components/ProfileMenu";
import NavSearch from "../Search";
import Svg1 from "@/../public/Svg-01.svg";
import Svg2 from "@/../public/Svg-02.svg";
import { useSession } from "next-auth/react";
export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimension();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  return (
    <div>
      <div onClick={onOpen}>
        <Image
          src={session?.user?.image ? session.user.image : colorMode === "light" ? Svg1 : Svg2}
          alt="logo"
          className="rounded-full"
          width={30}
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
              <div>Hello {session?.user?.name?.substring(0, 7).concat("...")}!</div>
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
            <UserTabs variant={"unstyled"}>{}</UserTabs>
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
