import { ChangeEventHandler, FormEventHandler } from "react";

export default function Add({
  addText,
  heading,
  content,
  inputPlaceholder,
  confirmBtnText,
  cancelBtnText,
  submit,
  onChange,
}: {
  addText?: string;
  heading?: string;
  content?: string;
  inputPlaceholder?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  submit?: FormEventHandler<HTMLFormElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        {addText}
      </label>
      <form
        onSubmit={submit}
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <h2>{heading}</h2>
        <p>{content}</p>
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="input w-full max-w-xs"
          onChange={onChange}
        />
        <button>{confirmBtnText}</button>
        <button type="reset">{cancelBtnText}</button>
      </form>
    </div>
  );
}
