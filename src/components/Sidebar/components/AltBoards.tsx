import { Disclosure, Transition } from "@headlessui/react";
import { Collapse } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
const boards = [
  {
    id: "1",
    name: "Board 1",
  },
  {
    id: "2",
    name: "Board 2",
  },
  {
    id: "3",
    name: "Board 3",
  },
];
export default function MyDisclosure() {
  return (
    <Disclosure>
      {({ open, close }) => (
        <div className="flex-col flex gap-2">
          <Disclosure.Button className={"flex justify-around items-center gap-3"}>
            <span>Boards</span>
            <BsChevronDown
              className={`${
                open ? "rotate-180 " : "rotate-0 "
              } transform  transition-all duration-300 font-bold `}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 "
            enterTo="transform opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 "
            leaveTo="transform opacity-0 "
          >
            <Disclosure.Panel as={`div`} className={`flex flex-col text-l gap-2`}>
              {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                  {board.name}
                </Link>
              ))}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
