"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Portal,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
//buttonstyles for ws :   py-[0.4rem] px-7 
//positionstyles for ws : absolute bottom-0 right-0 
export default function AddClass({
  category,
  placeholder,
  positionStyles,
  buttonStyles,
}: {
  category: string;
  placeholder: string;
  positionStyles: string;
  buttonStyles: string;
}) {
  const initRef = useRef();
  return (
    <div className={positionStyles}>
      <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef.current}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <button className={`bg-blue-500 ${buttonStyles} w-fit duration-300 transition-all`}>{placeholder}</button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>Add a {category}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Input type="text" placeholder={category + " name"} />
                  <Button mt={4} mx={2} colorScheme="blue" onClick={onClose} ref={initRef.current}>
                    Add
                  </Button>
                  <Button mt={4} colorScheme="blue" onClick={onClose} ref={initRef.current}>
                    Close
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </div>
  );
}
