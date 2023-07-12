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
import { ChangeEventHandler, FormEventHandler, HTMLAttributes, useRef, useState } from "react";

export default function AddClass({
  category,
  placeholder,
  positionStyles,
  buttonStyles,
  onSubmit,
  onChange,
  isLoading,
  add_edit,
}: {
  category: string;
  isLoading: boolean;
  placeholder: string;
  positionStyles: HTMLAttributes<HTMLDivElement>["className"];
  buttonStyles: HTMLAttributes<HTMLButtonElement>["className"]
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  add_edit: string | undefined | null;
}) {
  const initRef = useRef();

  return (
    <div className={positionStyles}>
      <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef.current}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <button className={` ${buttonStyles} w-fit duration-300 transition-all`}>
                {placeholder}
              </button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>
                  {add_edit}
                  {category}
                </PopoverHeader>
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
                      {isLoading ? <Spinner /> : ""} Add
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
