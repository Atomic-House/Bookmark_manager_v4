"use client";
import MemberTable from "./components/MemberTable";
import AddMember from "./components/add";
import Pagination from "./components/pagination";
import Search from "./components/search";
export default function Members() {
  return (
    <div>
      <div className="flex justify-between">
        <Search />
        <AddMember />
      </div>
      <MemberTable />
      <Pagination />
    </div>
  );
}
