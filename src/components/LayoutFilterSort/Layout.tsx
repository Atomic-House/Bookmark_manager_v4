"use client";

import React, { useState } from "react";
import { BsLayoutWtf } from "@react-icons/all-files/bs/BsLayoutWtf";
import { AiFillLayout } from "@react-icons/all-files/ai/AiFillLayout";
import { BsCircleSquare } from "@react-icons/all-files/bs/BsCircleSquare";
export default function Layout() {
  const [checked, setChecked] = useState("");
  return (
    <div className="dropdown">
      <label htmlFor="" tabIndex={0}>
        <BsLayoutWtf />
      </label>
      <div className="dropdown-content flex flex-col w-56 gap-3" tabIndex={0}>
        <h1 className="font-bold">Layout</h1>
        <p className="text-xs">Choose any layout you want for this list</p>
        <form
          action=""
          className="form-control"
          onChange={(e) => console.log(e.target)}
        >
          {layouts.map((l, i) => (
            <label
              className="label cursor-pointer"
              key={i}
              onClick={() => setChecked(l.value)}
            >
              <span className="label-text flex items-center gap-2">
                <l.icon /> {l.name} Layout
              </span>
              <input
                type="radio"
                name={l.value}
                id={l.name}
                value={l.value}
                className="radio checked:bg-[#422AFB]"
                checked={checked === l.value}
              />
            </label>
          ))}
          <div className="flex justify-end items-center gap-2">
            <button type="reset">Reset </button>
            <button
              type="submit"
              className="bg-[#422AFB] text-white rounded-xl px-10 py-3"
            >
              Apply{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
const layouts = [
  { name: `List`, value: `list`, icon: BsLayoutWtf },
  { name: `Card`, value: `card`, icon: AiFillLayout },
  { name: `Icon`, value: `icon`, icon: BsCircleSquare },
];
