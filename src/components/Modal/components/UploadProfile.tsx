//Modal for uploading profile photo and user background using uploadthing's api and components
"use client";
import { UploadButton } from "@/utils/uploadthing";
//upload thing css
import "@uploadthing/react/styles.css";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
export default function UploadImage({
  image,
  onClientUploadComplete,
  onBgClientUploadComplete,
}: {
  image: string | undefined | null;

  onClientUploadComplete?:
    | ((
        res?:
          | {
              fileUrl: string;
              fileKey: string;
            }[]
          | undefined,
      ) => void)
    | undefined;
  onBgClientUploadComplete?:
    | ((
        res?:
          | {
              fileUrl: string;
              fileKey: string;
            }[]
          | undefined,
      ) => void)
    | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Avatar
        onClick={onOpen}
        src={image!}
        width={"100px"}
        height={"100px"}
        position={"absolute"}
        top={"24"}
        p={2}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center m-2">Update Profile</div>
            {/* UploadButton which handles the recieving and uploading of images */}
            <UploadButton
              endpoint="imageUploader"
              onUploadError={(error: Error) => {
                console.log("error");
                alert("Try again \n" + "Error: " + error);
              }}
              onClientUploadComplete={onClientUploadComplete}
            />

            <div className="flex justify-center  m-2">Update Background</div>
            <UploadButton
              endpoint="bgUpload"
              onUploadError={(error: Error) => {
                console.log("error");
                alert("Try again \n" + "Error: " + error);
              }}
              onClientUploadComplete={onBgClientUploadComplete}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
