"use client";
import { useMutations } from "@/functions/mutations";
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
import { useEffect, useRef, useState } from "react";
import { BiLink } from "react-icons/bi";
export default function AddClass({
  category,
  positionStyles,
  buttonStyles,
  listId,
}: {
  category: string;
  positionStyles: string;
  buttonStyles: string;
  listId: string;
}) {
  const initRef = useRef();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const { mutateAsync, isLoading, error, isError, isSuccess } = useMutations(
    "create bookmarks",
    "bookmarks",
    name,
    url,
    "",
    listId,
    "POST",
  );
  useEffect(() => {
    if (isSuccess) {
      setName("");
    }
    setName(name);
  }, [mutateAsync, isSuccess, name]);
  if (isError) {
    console.error(error);
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={positionStyles}>
      <Popover
        closeOnBlur={false}
        placement="bottom"
        initialFocusRef={initRef.current}
      >
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <button
                className={` ${buttonStyles} w-fit duration-300 transition-all flex items-center justify-center`}
              >
                <BiLink className=" cursor-pointer" />
              </button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>Add a {category}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <form onSubmit={mutateAsync}>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={"Add custom name"}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        type="url"
                        name="url"
                        id="url"
                        placeholder={"Add url"}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <Button
                      mt={4}
                      mx={2}
                      colorScheme="blue"
                      ref={initRef.current}
                      type="submit"
                    >
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
