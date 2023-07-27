"use client";
import { useRestoreTrash } from "@/functions/mutations";
import { useFetchTrash } from "@/functions/queries";
import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { HoverHandlers } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
import { SiConvertio } from "@react-icons/all-files/si/SiConvertio";
export default function Page() {
  const [listId, setListId] = useState("");
  const [bookmarkId, setBookmarkId] = useState("");
  const [boardId, setBoardId] = useState("");
  const {
    data: lists,
    isError: isListError,
    isLoading: isListLoading,
    isSuccess: isListSuccess,
  } = useFetchTrash("lists");
  const {
    data: bookmarks,
    isError: isBookmarkError,
    isLoading: isBookmarkLoading,
    isSuccess: isBookmarkSuccess,
  } = useFetchTrash("bookmarks");
  const {
    data: boards,
    isError: isBoardError,
    isLoading: isBoardLoading,
    isSuccess: isBoardSuccess,
  } = useFetchTrash("boards");
  const { mutateAsync: restoreList, isLoading: isListRestoreLoading } =
    useRestoreTrash("lists", listId);
  const { mutateAsync: restoreBookmark, isLoading: isBookmarkRestoreLoading } =
    useRestoreTrash("bookmarks", bookmarkId);
  const { mutateAsync: restoreBoard, isLoading: isBoardRestoreLoading } =
    useRestoreTrash("boards", boardId);
  return (
    <div className="m-5">
      <h1 className="text-2xl mb-6">Trash</h1>
      <Tabs colorScheme="green" variant={"unstyled"}>
        <TabList>
          <Tab
            _selected={{ bgColor: "blue", textColor: "white" }}
            rounded={"lg"}
            px={"16"}
          >
            Lists
          </Tab>
          <Tab
            _selected={{ bgColor: "blue", textColor: "white" }}
            rounded={"lg"}
            px={"16"}
          >
            Bookmarks
          </Tab>

          <Tab
            _selected={{ bgColor: "blue", textColor: "white" }}
            rounded={"lg"}
            px={"16"}
          >
            Boards
          </Tab>
          <Tab
            _selected={{ bgColor: "blue", textColor: "white" }}
            rounded={"lg"}
            px={"16"}
          >
            Inbox
          </Tab>
        </TabList>
        <TabPanels>
          {/* Lists */}
          <TabPanel
            w={"75vw"}
            className="flex flex-col justify-between  w-[80vh]"
          >
            {isListLoading ? <Spinner /> : ""}
            {lists?.map((list: { id: string; name: string }) => (
              <Collection
                onHover={() => setListId(list.id)}
                key={list.id}
                id={list.id}
                name={list.name}
                onClickRestore={() => restoreList(list.id)}
                image={null}
              />
            ))}
          </TabPanel>

          {/*Bookmarks*/}
          <TabPanel
            w={"75vw"}
            className="flex flex-col justify-between  w-[80vh]"
          >
            {isBookmarkLoading ? <Spinner /> : ""}
            {bookmarks?.map(
              (bookmark: {
                id: string;
                name: string;
                title: string;
                favicon: string;
              }) => (
                <Collection
                  onHover={() => setBookmarkId(bookmark.id)}
                  key={bookmark.id}
                  id={bookmark.id}
                  name={
                    bookmark.name
                      ? bookmark.name
                      : bookmark.title
                      ? bookmark.title
                      : "Bookmark"
                  }
                  onClickRestore={() => restoreBookmark(bookmark.id)}
                  image={bookmark.favicon}
                />
              ),
            )}
          </TabPanel>

          <TabPanel
            w={"75vw"}
            className="flex flex-col justify-between  w-[80vh]"
          >
            {isBoardLoading ? <Spinner /> : ""}
            {boards?.map((board: { id: string; name: string }) => (
              <Collection
                onHover={() => setBoardId(board.id)}
                key={board.id}
                id={board.id}
                name={board.name}
                onClickRestore={() => restoreBoard(board.id)}
                image={null}
              />
            ))}
          </TabPanel>
          <TabPanel
            w={"75vw"}
            className="flex flex-col justify-between  w-[80vh]"
          ></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
function Collection({
  name,
  id,
  onClickRestore,
  image,
  onHover,
}: {
  name: string;
  onClickRestore: MouseEventHandler<HTMLDivElement>;
  id: string;
  image: string | null | undefined;
  onHover: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      key={id}
      className="flex justify-between gap-2 border-x-0 border-t-0 border-b-2 mb-2 p-2 "
    >
      <div className="flex items-center gap-2">
        {image ? (
          <Image src={image} width={50} height={50} alt={name} />
        ) : (
          <SiConvertio />
        )}

        <div>
          <div>{name}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="underline cursor-pointer text-blue-700"
          onClick={onClickRestore}
          onMouseOver={onHover}
        >
          Restore
        </div>
        <div>
          <BiTrashAlt />
        </div>
      </div>
    </div>
  );
}
