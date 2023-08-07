"use client";
import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  ReactNode,
  useState,
} from "react";
import { Transition } from "@headlessui/react";
export default function Create({
  buttonStyle,
  triggerPlaceholder,
  submitBtnStyle,
  cancelBtnStyle,
  bodyStyle,
  onSubmit,
  onChange,
  placeholder,
  type,
  label,
  content,
  header,
  inputStyle,
  isSuccess,
  contentStyle,
  headerStyle,
  successElement,
}: {
  buttonStyle?: string;
  triggerPlaceholder?: string;
  submitBtnStyle?: string;
  cancelBtnStyle?: string;
  bodyStyle?: string;
  onSubmit?: FormEventHandler<HTMLFormElement | Element>;
  onChange?: ChangeEventHandler<HTMLInputElement | undefined>;
  placeholder?: string;
  type?: string;
  label?: string;
  content?: ReactNode;
  header?: ReactNode;
  inputStyle?: string;
  isSuccess?: boolean;
  successElement?: ReactNode;
  contentStyle?: string;
  headerStyle?: string;
}) {
  const [isClose, toggleClose] = useState(false);
  return (
    <div className="relative z-50">
      {/* Trigger */}

      <button
        className={`flex text-xl font-bold ${buttonStyle} `}
        onClick={() => toggleClose(!isClose)}
      >
        {triggerPlaceholder ? triggerPlaceholder : "+"}
      </button>
      <Transition
        as={Fragment}
        show={isClose}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className={`absolute w-[30vw]  ${bodyStyle}`}
          onMouseLeave={() => toggleClose(false)}
        >
          {/*Header*/}
          <div className={` ${headerStyle}`}>{header}</div>
          {/* Content */}
          <div className={` ${contentStyle}`}>{content}</div>
          <form onSubmit={onSubmit}>
            {/* Body or Label */}
            <label htmlFor={type}>{label}</label>
            <input
              type="text"
              name={type}
              className={`w-full ${inputStyle}`}
              onChange={onChange}
              placeholder={placeholder}
            />
            <div className="flex float-right gap-2">
              <button
                className={cancelBtnStyle}
                type="reset"
                onClick={() => {
                  toggleClose(false);
                  if (isSuccess) toggleClose(!isClose);
                }}
              >
                Reset
              </button>
              <button
                className={`${submitBtnStyle} px-8 py-2 m-2 text-white rounded-full flex justify-center items-center`}
              >
                Add {type}
                {isSuccess ? successElement : ""}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
}
