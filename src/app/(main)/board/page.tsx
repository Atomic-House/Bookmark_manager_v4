"use client";
import ViewTabs from "@/components/View";
import { usePageData } from "@/hooks/viewPageFunctions";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const { viewsData, boardName, icon, setView, view, createViews } =
    usePageData();

  return (
    <div className="">
      <div>
        <div className="text-[#707EAE]">Main page / {boardName}</div>
        <span>{icon}</span>
        <span>{boardName}</span>
      </div>
      <ViewTabs
        views={viewsData.data}
        onChange={(e) => setView({ ...view, name: e.target.value })}
        createView={createViews.mutateAsync}
        isMutating={createViews.isLoading}
        isError={createViews.isError}
        isMutatingSuccess={createViews.isSuccess}
        error={createViews.error}
      />
    </div>
  );
}
