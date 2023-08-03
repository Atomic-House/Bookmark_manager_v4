"use client";
export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#422AFB] font-semibold text-5xl my-12">BRAND</h1>
        <h3 className="text-slate-500">Step 1/2</h3>
        <h1 className="text-5xl font-bold">Create a new workspace</h1>
        <h2 className="m-4 text-slate-500">
          Create a new or add workspace link to send request
        </h2>
      </div>
      <form className="grid grid-cols-1 my-12 mx-56">
        <label htmlFor="workspace" className="">
          Enter your workspace name
        </label>

        <input
          type="text"
          name="workspace"
          placeholder="Workspace name..."
          className="p-4 my-4 rounded-lg bg-slate-100"
        />
        <p>Choose any logo for your workspace</p>
        <span>+</span>
        <button className=" text-white bg-[#422AFB] p-4 rounded-lg">
          Create workspace
        </button>
      </form>
    </div>
  );
}
