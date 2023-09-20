"use client";
import { RiListSettingsLine } from "@react-icons/all-files/ri/RiListSettingsLine";

export default function Settings() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="m-1 text-2xl">
        <RiListSettingsLine />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}
