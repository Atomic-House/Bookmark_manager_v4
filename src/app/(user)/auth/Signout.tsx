import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Sign Out</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to sign out?</PopoverBody>
        <Button onClick={() => signOut()}>Confirm</Button>
        <Button>Cancel</Button>
      </PopoverContent>
    </Popover>
  );
}
