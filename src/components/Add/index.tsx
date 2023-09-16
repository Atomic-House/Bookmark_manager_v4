import { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
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
  return (
    <div className="dropdown dropdown-left dropdown-bottom">
      <label className="cursor-pointer " tabIndex={0}>
        {/* trigger */}
        {triggerText}
      </label>
      <form
        tabIndex={0}
        onSubmit={onSubmit}
        className="dropdown-content z-[100] menu p-2 shadow dark:bg-slate-900 rounded-box w-60 dark:text-white bg-white drop-shadow-lg"
      >
        <div>{heading}</div>
        <div>{content}</div>
        <div>
          <input
            type="text"
            className="p-2 rounded-lg bg-slate-900 w-fit"
            placeholder={inputPlaceholder}
            onChange={onChange}
          />
        </div>
        <div className=" w-fit  flex gap-2">
          <button
            className="bg-[#5D60EF] dark:text-white py-2 px-8 rounded-lg"
            type="submit"
          >
            {confirmBtnText}
          </button>
          <button type="reset">{cancelBtnText}</button>
        </div>
      </form>
    </div>
  );
}
