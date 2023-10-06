"use client";
import { useOverlayRef } from "@/hooks/util";
import { RiArrowDownLine } from "@react-icons/all-files/ri/RiArrowDownLine";
import { RiArrowUpDownLine } from "@react-icons/all-files/ri/RiArrowUpDownLine";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { SortOrderEnum } from "@/schema/enums";
export default function Sort() {
  const [selected, setSelected] = useState<SortOrderEnum | string>("newest");
  const { ref, toggleOpen, open } = useOverlayRef();
  return (
    <div className="relative">
      <button
        className="relative"
        tabIndex={1}
        onClick={() => toggleOpen(!open)}
      >
        <RiArrowUpDownLine />
      </button>

      <Transition
        show={open}
        // as={Fragment}
        className={
          "shadow-lg flex flex-col gap-3 p-2 rounded-lg absolute dropdown-content"
        }
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div ref={ref} className="grid  grid-cols-2 gap-1" tabIndex={1}>
          {sort.map((s, i) => (
            <div key={i} className="dropdown  flex flex-col items-center">
              <button
                tabIndex={0}
                className="p-2 text-center  border border-slate-300 flex justify-between w-52 rounded-lg   m-1"
              >
                {s.label}{" "}
                <span>
                  <RiArrowDownLine />
                </span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 gap-4 grid grid-cols-1 shadow bg-base-100 rounded-box w-52"
              >
                {s.options.map((o, i) => (
                  <li
                    key={i}
                    className={`flex cursor-pointer justify-between ${
                      selected === o ? "text-[#422AFB]" : ""
                    }`}
                    onClick={() => setSelected(o)}
                  >
                    <label htmlFor={o}>{o}</label>
                    <input
                      type="checkbox"
                      name={o}
                      checked={selected === o}
                      className="checkbox checked:checkbox-primary"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <button>Reset </button>
          <button className="bg-[#422AFB] rounded-lg py-2 px-8 text-white">
            Apply{" "}
          </button>
        </div>
      </Transition>
    </div>
  );
}
const sort = [
  {
    label: "Alphabets",
    options: ["a_z", "z_a"],
  },
  {
    label: "Data",
    options: ["newest", "oldest"],
  },
  {
    label: "Snooze",
    options: ["snooze", "unsnooze"],
  },
  {
    label: "Reminder",
    options: ["reminder", "no reminder"],
  },
];
