"use client";
import { ViewWithLists } from "@/schema/view";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import List from "../List";
import Add from "../Add";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useGetLists } from "@/hooks/getListFunctions";
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
  const [viewId, setViewId] = useState(searchParams.get("viewId")!);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const { data: lists, createList, setList, list } = useGetLists(viewId);
  console.log(lists.data);

  return (
    <div>
      <ul className="flex items-center">
        {views?.map((t, i) => (
          <li
            key={t.id}
            className={`tab tab-lg  tab-bordered ${
              searchParams.get("viewId") === t.id ? "tab-active " : ""
            }`}
            onClick={() => {
              setViewId(t.id!);
              router.push(pathname + "?" + createQueryString("viewId", t.id!));
            }}
          >
            {t?.name?.toString().slice(0, 15)}
          </li>
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
      </ul>
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
          isError={lists.isError}
          error={lists.error}
          isLoading={lists.isLoading}
          isSuccess={lists.isSuccess}
          onChange={(e) => setList({ ...list, name: e.target.value })}
          onSubmit={createList.mutateAsync}
        />
      </div>
      <div>
        <div className="grid lg:grid-cols-4 place-items-center  md:grid-cols-3 sm:grid-cols-2 ">
          {lists.data?.map((l) => <List {...l} key={l.id} />)}
        </div>
      </div>
    </div>
  );
}
