"use client"
import AddClass from "@/components/Create/create";
import { useMutations } from "@/functions/mutations";
import { useState } from "react";

export default function EditList({ id, name }: { id: string; name: string }) {
  const [newName, updateName] = useState("");
  const { mutateAsync, isLoading, isError, error } = useMutations(
    "update lists",
    "lists",
    newName,
    "",
    id,
    "PATCH"
  );
  if (isError) {
    console.error(error);
  }
  return (
    <div className="m-2 hover:opacity-95 duration-300">
    <AddClass
        add_edit={"Edit a "}
      category="lists"
      isLoading={isLoading}
      placeholder={"Edit"}
      onSubmit={mutateAsync}
      onChange={(e) => updateName(e.target.value)}
      buttonStyles="w-fit duration-300 transition-all"
      positionStyles=""
    />
</div>
  );
}
