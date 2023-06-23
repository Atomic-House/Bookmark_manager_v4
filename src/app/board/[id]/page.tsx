import List from "@/components/List";
import { lists } from "@/file";
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <h1 className="text-3xl m-5">Board</h1>
      <button className="bg-blue-500 p-2 m-2 flex justify-center items-center text-xl">
        <span>Add new List </span>
        <span className="mx-2 "> +</span>
      </button>
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
