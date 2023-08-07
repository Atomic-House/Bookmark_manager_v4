import { useState } from "react";
import "./slider.css";
export default function SliderComponent() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex  flex-col m-2 gap-2">
      <div className="flex justify-between">
        <span onClick={() => setValue(0)}>Default</span>
        <span onClick={() => setValue(242)}>Compact</span>
        <span onClick={() => setValue(491)}>Comfortable</span>
      </div>
      <div>
        <input
          type="range"
          className="px-6 flex items-center appearance-none bg-transparent w-[100vw] cursor-pointer"
          min="1"
          max="500"
          value={value}
          onChange={({ target: { value: radius } }) => {
            setValue(Number(radius));
          }}
          onClickCapture={() => {
            let num = value;
            if (num > 0 && num < 200) setValue(0);
            if (num > 200 && num < 350) setValue(242);
            if (num > 350) setValue(491);
          }}
        />
      </div>
    </div>
  );
}
