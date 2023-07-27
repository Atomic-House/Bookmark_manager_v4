"use client";
import { useMutations } from "@/functions/mutations";
import { Bookmark } from "@prisma/client";
import { useContext } from "react";
import { ListPrefContext } from "../context/ListPrefContext";
import IconView from "./components/views/Icon";
import ListView from "./components/views/List";

export default function Bookmark({
  name,
  id,
  url,
  favicon,
  title,
  description,
  index,
  createdAt,
  ...bookmarkProps
}: Bookmark & {
  index: number;
}) {
  const { listPrefs } = useContext(ListPrefContext);
  const { mutateAsync, isError, error, isLoading, isSuccess } = useMutations(
    "delete bookmark",
    "bookmarks",
    "",
    "",
    "",
    id,
    "PUT",
  );
  if (isSuccess) {
    console.log("successfully deleted");
  }
  if (isError) {
    console.error(error);
  }
  const icon = `https://www.google.com/s2/favicons?domain=${
    new URL(url).hostname
  }&sz=256`;
  if (listPrefs?.view === "icon") {
    return (
      <IconView
        mutateAsync={mutateAsync}
        icon={icon}
        description={description}
        name={name}
        title={title}
        url={url}
        favicon={favicon}
        index={index}
        id={id}
        createdAt={createdAt}
        {...bookmarkProps}
      />
    );
  }
  if (listPrefs?.view === "list") {
    return (
      <ListView
        icon={icon}
        mutateAsync={mutateAsync}
        description={description}
        name={name}
        title={title}
        url={url}
        favicon={favicon}
        index={index}
        id={id}
        createdAt={createdAt}
        {...bookmarkProps}
      />
    );
  }
}
