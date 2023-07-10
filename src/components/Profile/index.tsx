"use client";
import Left from "./components/Left";
import Right from "./components/Right";
export default function Profile() {
  return (
    <div className="flex gap-3">
      <Left />
      <Right />
    </div>
  );
}
