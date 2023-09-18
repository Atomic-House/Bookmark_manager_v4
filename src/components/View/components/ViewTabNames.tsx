"use client";

import { View } from "@/schema/view";
import { Tab } from "@headlessui/react";

export default function ViewTabs({ ...props }: View) {
  return (
    <Tab key={props.id} className={"tab tab-bordered"}>
      {props.name}
    </Tab>
  );
}
