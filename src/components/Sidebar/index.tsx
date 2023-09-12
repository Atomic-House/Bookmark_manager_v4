import Attributes from "./components/Atrributes"
import { fakerWorkspaces } from "@/functions/fakedata"
import Select from "./components/Select"
const ws = fakerWorkspaces(10)
export default function Sidebar() {

  return (
    <section className=" h-screen flex flex-col items-center gap-3 lg:w-[20vw] drop-shadow-lg dark:bg-[#1A1A1A] rounded-3xl my-4">
      <h1 className="text-3xl font-bold text-black dark:text-white mx-2 my-4 py-5">Brand</h1>
      <Select workspaces={ws} />
      <Attributes />
    </section>
  )
}
