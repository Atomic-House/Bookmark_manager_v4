"use client";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { BsUpload } from "@react-icons/all-files/bs/BsUpload";
import { IoIosShare } from "@react-icons/all-files/io/IoIosShare";
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze";
import { BiCalendarX } from "@react-icons/all-files/bi/BiCalendarX";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate";
import { BiCollapse } from "@react-icons/all-files/bi/BiCollapse";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
export default function Popover({
  bg,
  rounded,
  text,
  contentStyle,
}: {
  bg?: string;
  rounded?: string;
  text?: string;
  contentStyle?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  //List of edit list options
  const items = [
    {
      id: 1,
      item: [
        {
          id: 1,
          title: "Upload Link",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BsUpload />,
        },
        {
          id: 2,
          title: "Share",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <IoIosShare />,
        },
      ],
    },
    {
      id: 2,
      item: [
        {
          id: 1,
          title: "Add Snooze",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BiAlarmSnooze />,
        },
        {
          id: 2,
          title: "Add Reminder",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BiCalendarX />,
        },
      ],
    },
    {
      id: 3,
      item: [
        {
          id: 1,
          title: "Mark as Favorite",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <AiOutlineStar />,
        },
        {
          id: 2,
          title: "Duplicate",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BiDuplicate />,
        },
        {
          id: 3,
          title: "Collapse",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BiCollapse />,
        },
      ],
    },
    {
      id: 4,
      item: [
        {
          id: 1,
          title: "Move to trash",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <BiTrashAlt />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="relative">
        {/* Trigger to open popover   */}
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          Trigger{" "}
        </button>
        <Transition
          show={isOpen}
          enterFrom="opacity-0 -translate-y-2  transition-all duration-300"
          enterTo="opacity-100 translate-y-0 scale-100 transition-all duration-300"
        >
          <div
            className={`p-4 ${contentStyle} ${rounded} absolute ${bg} ${text}`}
          >
            <ul className="flex flex-col gap-2">
              {items.map(({ id, item }) => (
                <li key={id}>
                  {item.map((i) => (
                    <div
                      key={i.id}
                      className="flex gap-2 items-center p-2 font-light rounded-lg duration-300 cursor-pointer hover:bg-slate-300"
                      onClick={i.onClick}
                    >
                      {i.icon} {i.title}
                    </div>
                  ))}
                  <hr />
                </li>
              ))}
              <li className="grid grid-cols-5 grid-rows-2 colors">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-1 h-1 bg-${color
                      .toString()
                      .trimEnd()}-500 p-2`}
                  ></div>
                ))}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
      <main>Hello world I am you buddy</main>
    </>
  );
}
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
  "pink",
  "gray",
  "cyan",
];
// My custom made popover
