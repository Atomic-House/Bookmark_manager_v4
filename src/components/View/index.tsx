"use client";
import { ViewWithLists } from "@/schema/view";
import { Tab } from "@headlessui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useState,
} from "react";
import List from "../List";
import Add from "../Add";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { usePageData } from "@/hooks/viewPageFunctions";
export default function ViewTabs({
  views,
  createView,
  isMutating,
  isMutatingSuccess,
  error,
  isError,
  onChange,
}: {
  views?: ViewWithLists[];
  createView?: FormEventHandler<HTMLElement>;
  isMutating?: boolean;
  isMutatingSuccess?: boolean;
  isError?: boolean;
  error?: unknown;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const viewId = searchParams.get("viewId")!;
  const { createList, listsData, list, setList } = usePageData(viewId);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const [selectIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <Tab.Group selectedIndex={selectIndex} onChange={setSelectedIndex}>
        <Tab.List className={"tabs "} as="ul">
          {views?.map((t, i) => (
            <Tab as={Fragment} key={t.id}>
              {({ selected }) => (
                <li
                  key={t.id}
                  className={`tab tab-lg  tab-bordered ${
                    selected ? "tab-active " : ""
                  }`}
                  onClick={() => {
                    // <pathname>?sort=asc
                    router.push(
                      pathname + "?" + createQueryString("viewId", t.id!),
                    );
                  }}
                >
                  {t?.name?.toString().slice(0, 15)}
                </li>
              )}
            </Tab>
          ))}
          <li>
            <Add
              key={"add-view"}
              triggerText={
                <>
                  <AiOutlinePlus className="font-bold" />
                </>
              }
              dropdownX="dropdown-right"
              dropdownY="dropdown-bottom"
              heading="New Layout"
              inputPlaceholder="Layout Name"
              content="Add a new layout"
              confirmBtnText="Add"
              cancelBtnText="Reset"
              isError={isError}
              error={error}
              isLoading={isMutating}
              isSuccess={isMutatingSuccess}
              onChange={onChange}
              onSubmit={createView}
            />
          </li>
        </Tab.List>
        <div className="my-4">
          <Add
            key={"add-list"}
            triggerText={
              <span className="flex gap-2 items-center bg-[#5D60EF] rounded-lg text-white p-2">
                <AiOutlinePlus className="font-bold" /> Add List
              </span>
            }
            dropdownX="dropdown-right"
            dropdownY="dropdown-bottom"
            heading="New List"
            inputPlaceholder="List Name"
            content="Add a new list"
            confirmBtnText="Add"
            cancelBtnText="Reset"
            isError={createList.isError}
            error={createList.error}
            isLoading={createList.isLoading}
            isSuccess={createList.isSuccess}
            onChange={(e) => setList({ ...list, name: e.target.value })}
            onSubmit={createList.mutateAsync}
          />
        </div>
        <Tab.Panels as="div">
          {views?.map((v) => (
            <Tab.Panel className={"grid grid-cols-4"} key={v.id}>
              {v.lists?.map((l) => (
                <List {...l} key={l.id} bookmarks={[]} />
              )) || <span>Add a new list</span>}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
