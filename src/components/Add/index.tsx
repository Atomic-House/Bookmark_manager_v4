"use client";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useEffect,
} from "react";
export default function Add({
  triggerText,
  heading,
  content,
  inputPlaceholder,
  confirmBtnText,
  cancelBtnText,
  onSubmit,
  onChange,
  dropdownX,
  dropdownY,
  isError,
  isLoading,
  isSuccess,
  error,
  emojiSelector,
}: {
  triggerText?: string | ReactNode;
  heading?: string;
  content?: string;
  inputPlaceholder?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dropdownX?: "dropdown-left" | "dropdown-right";
  dropdownY?: "dropdown-top" | "dropdown-bottom";
  isSuccess?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  emojiSelector?: React.JSX.Element;
}) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error, isError]);
  return (
    <div className={`dropdown ${dropdownY} ${dropdownX} z-50 `}>
      <span className="cursor-pointer " tabIndex={0}>
        {/* trigger */}
        {triggerText}
      </span>
      <form
        tabIndex={0}
        onSubmit={onSubmit}
        className="dropdown-content z-[100] menu p-2 shadow dark:bg-slate-900 rounded-box w-60 dark:text-white bg-white drop-shadow-lg"
      >
        <div>{heading}</div>
        <div>{content}</div>
        <div>
          {emojiSelector}
          <input
            type="text"
            className="p-2 rounded-lg dark:bg-slate-900 w-fit"
            placeholder={inputPlaceholder}
            onChange={onChange}
          />
        </div>
        <div className=" w-fit  flex gap-2">
          <button
            className="bg-[#5D60EF] dark:text-white   py-2 px-8 rounded-lg"
            type="submit"
          >
            {isLoading ? (
              <span className="loading loading-ball loading-sm"></span>
            ) : isSuccess ? (
              <TickSvg />
            ) : (
              confirmBtnText
            )}
            {/* {confirmBtnText} */}
          </button>
          <button type="reset">{cancelBtnText}</button>
        </div>
      </form>
    </div>
  );
}
function TickSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
