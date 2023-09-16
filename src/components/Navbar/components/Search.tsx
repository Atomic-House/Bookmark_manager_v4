import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
export default function Search() {
  return (
    <>
      <div className="flex items-center gap-3 bg-slate-950 w-fit m-2 py-2 px-6 rounded-full">
        <label htmlFor="search">
          <AiOutlineSearch />
        </label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="focus:outline-none focus:border-none input input-ghost focus:bg-slate-950"
        />
      </div>
    </>
  );
}
