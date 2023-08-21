import { BiSearch } from "@react-icons/all-files/bi/BiSearch";

export default function Search() {
  return (
    <div className="flex items-center m-4">
      <BiSearch />
      <input
        type="text"
        placeholder="Search an user"
        className="input  w-full max-w-xs"
      />
    </div>
  );
}
