"use client";
import ViewTabs from "@/components/View";
import { useCreate } from "@/hooks/mutations";
import { useFetch } from "@/hooks/queries";
import { useAuth } from "@/hooks/util";
import { usePageData } from "@/hooks/viewPageFunctions";
import { ViewWithLists } from "@/schema/view";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const { viewsData, boardName, icon } = usePageData();
  return (
    <div className="">
      <div>
        <div className="text-[#707EAE]">Main page / {boardName}</div>
        <span>{icon}</span>
        <span>{boardName}</span>
      </div>
      <ViewTabs views={viewsData.data} />
    </div>
  );
}
