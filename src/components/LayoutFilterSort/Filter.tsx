"use client";
import { FiFilter } from "@react-icons/all-files/fi/FiFilter";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import Settings from "@/svgs/visibility-conditional1";
export default function Filter() {
  return (
    <div>
      {/* trigger */}
      <div className="dropdown ">
        <button
          tabIndex={0}
          className="dark:text-white text-2xl bg-slate-800 p-3 "
        >
          <FiFilter />
        </button>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] flex flex-col gap-2 menu p-2 shadow bg-slate-950 rounded-box w-fit"
        >
          <h2>Filter</h2>
          <span className="relative flex items-center gap-8 ">
            <input
              type="text"
              className=" input input-ghost"
              placeholder="Search..."
            />
            <BiSearch className="absolute " />
          </span>
          <div className="mb-8 flex flex-col gap-2">
            <h2> Top tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex gap-2 outline outline-offset-1 outline-1 rounded-xl p-1 hover:outline-2 cursor-pointer hover:opacity-90 duration-300  items-center"
                >
                  <span
                    className={`badge ${tag.badge} badge-sm`}
                    key={tag.name}
                  ></span>
                  <span>{tag.name}</span>
                </span>
              ))}
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-2 mt-5">
            {checks.map((check, index) => (
              <div key={index} className="flex justify-between">
                <label htmlFor={check}>{check}</label>
                <input
                  type="checkbox"
                  className="checkbox rounded"
                  name={check}
                />
              </div>
            ))}
          </div>

          <div className=" flex gap-4 justify-end items-center ">
            <button>Reset </button>
            <button className="dark:bg-[#9747FF] dark:text-white py-2 rounded-2xl px-4">
              Apply
            </button>
          </div>
          <hr />
          <div className="flex  gap-2 bg-slate-900 p-3 rounded-xl justify-center">
            <Settings />
            Conditional Visibility
          </div>
        </div>
      </div>
    </div>
  );
}
const tags = [
  { name: "social media", badge: "bagde-primary" },
  { name: `marketing`, badge: "badge-secondary" },
  { name: `blog`, badge: "badge-secondary" },
  { name: `personal`, badge: "badge-accent" },
  { name: `business`, badge: "badge-info" },
];

const checks = ["Most Clicked", "Broken Links", "Duplicate Links"];
