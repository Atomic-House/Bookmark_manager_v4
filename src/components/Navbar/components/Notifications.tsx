import React from "react";
import { BiMessageRoundedDots } from "@react-icons/all-files/bi/BiMessageRoundedDots";
export default function Notifications() {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="m-1">
        <BiMessageRoundedDots className="text-2xl" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
