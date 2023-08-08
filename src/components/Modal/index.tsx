// Dialog model for confirmation of deletion of an item
"use client";
import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function DialogModal({
  desc,
  func,
  confirmation,
  isSuccess,
  isLoading,
  type,
}: {
  desc: string | undefined | JSX.Element;
  func: MouseEventHandler<HTMLButtonElement>;
  confirmation: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  type: "menu" | "button";
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const component =
    type === "menu" ? (
      <MenuItem onClick={onOpen} className="flex gap-2">
        {desc}
      </MenuItem>
    ) : (
      <Button onClick={onOpen}>{desc}</Button>
    );
  return (
    <>
      {component}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{confirmation}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={(e) => {
                func(e);
                onClose();
              }}
            >
              {isLoading ? <Spinner /> : ""} Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
