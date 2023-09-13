import { Transition } from "@headlessui/react";
import { ChangeEventHandler, FormEventHandler, ReactNode, useEffect, useRef, useState } from "react";
export default function Add({
  triggerText,
  heading,
  content,
  inputPlaceholder,
  confirmBtnText,
  cancelBtnText,
  onSubmit,
  onChange,
}: {
  triggerText?: string | ReactNode;
  heading?: string;
  content?: string;
  inputPlaceholder?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [open, toggleOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleOpen(false)
      }
    }
    if (open) {
      document.addEventListener('click', handleOutsideClick)
    }
    else {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [open])
  return (
    <div className="">
      <div className="cursor-pointer" onClick={() => toggleOpen(!open)}>
        {/* trigger */}
        {triggerText}
      </div>
      <Transition ref={ref} show={open} className={`relative`} as="div"
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form action="" onSubmit={onSubmit} className="absolute dark:bg-slate-900 p-2 flex flex-col gap-2 rounded-lg">
          <div className="">{heading}</div>
          <div className="">{content}</div>
          <div><input type="text" className="p-2 rounded-lg bg-slate-900" placeholder={inputPlaceholder} onChange={onChange} /></div>
          <div className=" w-fit  flex gap-2">
            <button className="bg-[#5D60EF] dark:text-white py-2 px-8 rounded-lg" type="submit">{confirmBtnText}</button>
            <button type="reset">{cancelBtnText}</button>
          </div>
        </form>
      </Transition>
    </div>
  );
}
