"use client";
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
export default function PopoverButton({ onCancel, onConfim }: { onCancel: any; onConfim: any }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>
          <div>Are you sure you want to delete it?</div>
          <Button colorScheme="cyan" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfim}>
            Confirm
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
