//Fuzzy searcing all the undeleted bookmarks in the search bar
"use client";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import { Input, Spinner, useDisclosure } from "@chakra-ui/react";
import useWindowDimension from "@/hooks/window";
import { useFetchData } from "@/functions/queries";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Bookmark } from "@prisma/client";
import { Transition } from "@headlessui/react";
export default function NavSearch() {
  const { width } = useWindowDimension();
  const { data, isLoading, refetch } = useFetchData<Bookmark[] | undefined>("all");
  const [results, setResults] = useState<
    | {
        name: string | null;
        url: string | URL;
        title: string | null;
        favicon: string | null;
      }[]
    | undefined
  >(
    data?.map((d) => {
      return { name: d.name, url: d.url, title: d.title, favicon: d.favicon };
    }),
  );
  useEffect(() => {
    refetch();
  }, [refetch]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fuse = new Fuse(results!, {
    keys: ["title", "url", "name"],
  });

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    onOpen();
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      setResults(results);
      return;
    }
    const result = fuse.search(value);
    const items = result.map((res) => res.item);
    setResults(items);
  }
  return (
    <div className="sticky" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="bg-slate-200 flex items-center p-2 px-4 rounded-full">
        <BiSearch />

        {isLoading ? <Spinner /> : ""}
        <Input
          fontSize={"xs"}
          w={width > 768 ? "full" : "fit-content"}
          border={0}
          placeholder="search lists, tags, bookm..."
          type="text"
          onChange={handleSearch}
        />
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {isOpen && (
          <div className="flex flex-col gap-5 justify-center p-2 bg-sky-400 opacity-75 rounded-lg absolute z-50">
            {results?.map((r, index) => {
              const icon = `https://www.google.com/s2/favicons?domain=${
                new URL(r.url).hostname
              }&sz=256`;
              return (
                <Link as={r.url} href={r.url} target="_blank" key={index} className="flex gap-2">
                  <Image
                    src={r.favicon ? r.favicon : icon}
                    alt={r.title ? r.title : "alt"}
                    width={30}
                    height={30}
                  ></Image>{" "}
                  {r.name ? r.name : r.title?.slice(0, 22) + "..."}
                </Link>
              );
            })}
          </div>
        )}
      </Transition>
    </div>
  );
}
