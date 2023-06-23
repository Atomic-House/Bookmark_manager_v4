"use client";
import { signIn } from "next-auth/react";
export default function SignIn() {
  return (
    <div onClick={() => signIn()}>
      <h1>Sign In</h1>
    </div>
  );
}
