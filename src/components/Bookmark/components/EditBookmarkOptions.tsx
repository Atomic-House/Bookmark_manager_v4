//Custom popover component made only with TailwindCSS
"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { AiFillCalendar } from "@react-icons/all-files/ai/AiFillCalendar";
import { BiAlarmSnooze } from "@react-icons/all-files/bi/BiAlarmSnooze";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BiTrashAlt } from "@react-icons/all-files/bi/BiTrashAlt";
export default function EditBookmarkOption({
  bg,
  trigger,
  rounded,
  text,
  contentStyle,
}: {
  bg?: string;
  rounded?: string;
  text?: string;
  trigger?: string | ReactNode;
  contentStyle?: string;
}) {
  const [isOpen, toggleOpen] = useState(false);
  const overLayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleCloseOverLay(event: MouseEvent) {
      if (
        overLayRef.current &&
        !overLayRef.current.contains(event.target as Node)
      ) {
        toggleOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleCloseOverLay);
    } else {
      document.removeEventListener("click", handleCloseOverLay);
    }
  }, [isOpen]);
  //List of edit list options
  const items = [
    {
      id: 1,
      item: [
        {
          id: 1,
          title: "Edit",
          onClick: (e: any) => {
            /* Your click event handler function */
          },
          icon: <FiEdit />,
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
          icon: <AiFillCalendar />,
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
      <div className="relative font-semibold dropdown">
        {/* Trigger to open popover   */}
        <button className="cursor-pointer" onClick={() => toggleOpen(!isOpen)}>
          {trigger}{" "}
        </button>
        <Transition
          as="div"
          ref={overLayRef}
          show={isOpen}
          className={`font-semibold container z-[1000] dropdown-content`}
          enterFrom="opacity-0 -translate-y-2  transition-all duration-300"
          enterTo="opacity-100 translate-y-0 scale-100 transition-all duration-300"
        >
          <ul
            className={`p-4 ${contentStyle} ${bg} ${rounded} m-auto w-48 dropdown-content right-0  absolute  ${text} flex flex-col gap-2`}
          >
            {items.map(({ id, item }) => (
              <li key={id} className="flex flex-col">
                {item.map((i) => (
                  <div
                    key={i.id}
                    className="flex dark:text-white hover:dark:text-black gap-2 items-center p-2 font-light rounded-md duration-300 cursor-pointer dark:hover:bg-slate-300"
                    onClick={i.onClick}
                  >
                    {i.icon} {i.title}
                  </div>
                ))}
                <hr />
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </>
  );
}
