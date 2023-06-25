"use client"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Portal,
  Box,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function AddClass() {
  const initRef = useRef();
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef.current}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Click to {isOpen ? "close" : "open"}</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Add a List</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>Hello. Nice to meet you! This is the body of the popover</Box>
                <Button mt={4} colorScheme="blue" onClick={onClose} ref={initRef.current}>
                  Close
                </Button>
              </PopoverBody>
              <PopoverFooter>This is the footer</PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
