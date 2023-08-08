import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
//Confirm signout popover component
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
