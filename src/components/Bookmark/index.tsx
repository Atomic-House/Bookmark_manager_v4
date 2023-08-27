// main bookmark component
"use client";
import { useMutations } from "@/functions/mutations";
import { $Enums, Bookmark } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { ListPrefContext } from "../context/ListPrefContext";
import IconView from "./components/views/Icon";
import ListView from "./components/views/List";
import CardView, { AltCardView } from "./components/views/Card";
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
  const [lp, setLp] = useState<$Enums.View>(
    listPrefs?.view || $Enums.View.LIST,
  );
  const { mutateAsync, isError, error } = useMutations(
    "delete bookmark",
    "bookmarks",
    "",
    "",
    "",
    id,
    "PUT",
  );
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    setLp(listPrefs?.view!);
  }, [isError, listPrefs?.view, error]);

  const icon = `https://www.google.com/s2/favicons?domain=${
    new URL(url).hostname
  }&sz=256`;

  if (lp === $Enums.View.ICON) {
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

  if (lp === $Enums.View.LIST) {
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
  if (lp === $Enums.View.CARD) {
    return (
      <CardView
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
