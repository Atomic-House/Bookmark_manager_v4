"use client";
import List from "@/components/List";
import { lists } from "@/file";
import AddClass from "@/components/Create/create";
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <h1 className="text-3xl m-5">Board</h1>
      <div className="bg-blue-500 p-2 m-2 w-fit flex justify-center items-center text-xl">
        <span>
          <AddClass category="list" placeholder="Add a list" buttonStyles="" positionStyles=""/>
        </span>
        <span className="mx-2 "> +</span>
      </div>
      {/* Lists*/}

      <div
        id="lists"
        className="grid grid-cols-1 md:grid-cols-3 border-2 border-black w-full gap-3 m-5 place-items-center"
      >
        {lists.map((list) => {
          return <List key={list.id} name={list.name} id={list.id} bookmarks={list.bookmarks} />;
        })}
      </div>
    </div>
  );
}
