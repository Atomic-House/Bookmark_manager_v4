"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Portal,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
export default function AddClass({
  category,
  placeholder,
  positionStyles,
  buttonStyles,
  onSubmit,
  onChange,
}: {
  category: string;
  placeholder: string;
  positionStyles: string;
  buttonStyles: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const initRef = useRef();

  return (
    <div className={positionStyles}>
      <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef.current}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <button className={`bg-blue-500 ${buttonStyles} w-fit duration-300 transition-all`}>
                {placeholder}
              </button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>Add a {category}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <form onSubmit={onSubmit}>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={category + " name"}
                      onChange={onChange}
                    />
                    <Button mt={4} mx={2} colorScheme="blue" ref={initRef.current} type="submit">
                      Add
                    </Button>
                    <Button
                      type="button"
                      mt={4}
                      colorScheme="blue"
                      onClick={onClose}
                      ref={initRef.current}
                    >
                      Close
                    </Button>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </div>
  );
}
