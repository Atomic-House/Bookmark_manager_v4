//Custom popover component made only with TailwindCSS
"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { BsUpload } from "@react-icons/all-files/bs/BsUpload";
import { IoIosShare } from "@react-icons/all-files/io/IoIosShare";
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze";
import { BiCalendarX } from "@react-icons/all-files/bi/BiCalendarX";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate";
import { BiCollapse } from "@react-icons/all-files/bi/BiCollapse";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
export default function EditListOptions({
  bg,
  rounded,
  text,
  contentStyle,
  trigger,
}: {
  bg?: string;
  rounded?: string;
  text?: string;
  contentStyle?: string;
  trigger?: string | ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const overLayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleOverlayClose(event: MouseEvent) {
      if (
        overLayRef.current &&
        !overLayRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleOverlayClose);
    } else {
      document.removeEventListener("click", handleOverlayClose);
    }
  });
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
      <div className="dropdown dropdown-left ">
        {/* Trigger to open popover   */}
        <label tabIndex={0} className=" cursor-pointer">
          {trigger}{" "}
        </label>

        <div
          className={`dark:text-white z-[1000] w-60 dropdown-content p-4 ${contentStyle} rounded-lg absolute dark:bg-slate-900  ${text}`}
          tabIndex={0}
        >
          <ul className="flex flex-col gap-2">
            {items.map(({ id, item }) => (
              <li key={id}>
                {item.map((i) => (
                  <div
                    key={i.id}
                    className="flex hover:dark:text-black gap-2 items-center p-2 font-light rounded-lg duration-300 cursor-pointer hover:bg-slate-300"
                    onClick={i.onClick}
                  >
                    {i.icon} {i.title}
                  </div>
                ))}
                <hr />
              </li>
            ))}
            <li className="grid grid-cols-5 grid-rows-2 colors gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 hover:${color
                    .replace("500", "300")
                    .trim()} ${color} p-2`}
                ></div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-cyan-500",
];
// My custom made popover
