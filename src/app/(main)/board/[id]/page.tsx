"use client";
import ViewTabs from "@/components/View";
import { usePageData } from "@/hooks/viewPageFunctions";
import Add from "@/components/Add";
export default function Page({ params }: { params: { id: string } }) {
  const { viewsData, boardName, icon, setView, view, createViews } =
    usePageData(params.id);

  return (
    <div className="">
      <div>
        <div className="text-[#707EAE]">Main page / {boardName}</div>
        <span>{icon}</span>
        <span>{boardName}</span>
      </div>
      {viewsData?.data?.length === 0 ? (
        <span className="absolute ml-auto mr-auto left-0 right-0 text-center">
          <Add
            key={"add-view"}
            triggerText={
              <button className="btn btn-primary">
                No Layout. Click Here to Add
              </button>
            }
            dropdownX="dropdown-right"
            dropdownY="dropdown-bottom"
            heading="New Layout"
            inputPlaceholder="Layout Name"
            content="Add a new layout"
            confirmBtnText="Add"
            cancelBtnText="Reset"
            isError={createViews.isError}
            error={createViews.error}
            isLoading={createViews.isLoading}
            isSuccess={createViews.isSuccess}
            onChange={(e) => setView({ ...view, name: e.target.value })}
            onSubmit={createViews.mutateAsync}
          />
        </span>
      ) : (
        <ViewTabs
          views={viewsData.data}
          onChange={(e) => setView({ ...view, name: e.target.value })}
          createView={createViews.mutateAsync}
          isMutating={createViews.isLoading}
          isError={createViews.isError}
          isMutatingSuccess={createViews.isSuccess}
          error={createViews.error}
        />
      )}
    </div>
  );
}
