"use client";

import IconPicker from "@/components/Icon/iconpicker";
import ThemeProvider from "@/components/Theme/themeProvider";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useState } from "react";
export default function Page() {
  const [icon, setIcon] = useState<React.JSX.Element | string>(
    <AiOutlinePlus />,
  );
  return (
    <main className="flex flex-col justify-center items-center gap-3 m-4 ">
      <ThemeProvider />
      <h1 className="text-4xl text-[#5D60EF] mb-10">Brand</h1>
      <p>Step 1/2</p>
      <h2 className="text-4xl font-semibold">Create a new Workspace</h2>
      <p className="font-medium text-xs">
        Create a new Worksapce or add workspace link to send request
      </p>
      <form action="" className="mt-5 w-[50vw]">
        <label htmlFor="name">
          <p>Enter your workspace name</p>
          <input
            type="text"
            className="input w-full"
            name="name"
            placeholder="Workspace name..."
          />
        </label>
        <div>
          <p>Choose any logo for your workspace</p>
          <div className="flex gap-5 m-3 items-center">
            <IconPicker trigger={icon} />
            {workEmojis.map((e) => (
              <span
                key={e}
                className="cursor-pointer hover:bg-black rounded-md p-2"
                onClick={() => setIcon(e)}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
        <button className="btn btn-primary w-full mt-5">
          Create Workspace
        </button>
      </form>
    </main>
  );
}

const workEmojis = ["👔", "💼", "📊", "🖋️", "💻"];
