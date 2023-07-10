"use client";
export default function Right() {
  return (
    <div className="w-[50%] m-3 relative">
      <section className="flex flex-col gap-6 p-2 border-2 bg-slate-100 drop-shadow-xl rounded-lg relative">
        {/* <section className="w-[50%] flex flex-col  p-3 bg-slate-100"> */}

        <div id="type" className="flex justify-between items-center mb-4">
          <div className="text-blue-800 text-xl font-extrabold">Account type</div>
          <div className="flex gap-3 items-center">
            <span className="text-blue-700 font-extrabold">Free </span>
            <span className="bg-yellow-500 p-2 rounded-full border-2 border-blue-900">
              Change to premium
            </span>
          </div>
        </div>
        <hr className="border-1 border-blue-600" />
        <div className="flex justify-between">
          <span>User id</span>
          <span>erfmvskoghwoeevnahef</span>
        </div>
        <hr />
        <div className="flex justify-between pb-8 items-center">
          <span>Member since</span>
          <span>July 9th, 2023</span>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center m-16 gap-8">
          <div className="text-2xl text-yellow-500">PRO Membership</div>
        <button className="border-2 border-blue-500 text-blue-500 p-2  rounded-lg hover:bg-blue-500 hover:text-white duration-300 flex items-center">Know more</button>
      </section>
    </div>
  );
}
