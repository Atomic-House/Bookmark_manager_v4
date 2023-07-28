"use client";

import {
  Button,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

export default function AddClass({
  category,
  placeholder,
  positionStyles,
  buttonStyles,
  onSubmit,
  onChange,
  isLoading,
  add_edit,
  list,
  isSuccess,
}: {
  category: string;
  isLoading: boolean;
  placeholder: string;
  positionStyles: HTMLAttributes<HTMLDivElement>["className"];
  buttonStyles: HTMLAttributes<HTMLButtonElement>["className"];
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  add_edit: string | undefined | null;
  list?: React.ReactNode;
  isSuccess?: boolean;
}) {
  const initRef = useRef();
  return (
    <div className={positionStyles}>
      <Popover
        closeOnBlur={false}
        placement="bottom"
        initialFocusRef={initRef.current}
      // isOpen={}
      >
        {({ isOpen, onClose }) => {
          return (
            <>
              <PopoverTrigger>
                <button
                  className={` ${buttonStyles} w-fit duration-300 transition-all`}
                >
                  {placeholder}
                </button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverHeader>
                    {add_edit}
                    {category.slice(0, category.length - 1)}
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
                        my={2}
                        p={2}
                        variant={"unstyled"}
                      />
                      <Button
                        mt={4}
                        mx={2}
                        px={9}
                        bg="#422AFB"
                        onClick={onClose}
                        textColor={"white"}
                        ref={initRef.current}
                        type="submit"
                      >
                        {isLoading ? <Spinner /> : ""} Add
                      </Button>
                      <Button
                        type="button"
                        mt={4}
                        textColor={"black"}
                        colorScheme="white"
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
          );
        }}
      </Popover>
    </div>
  );
}
