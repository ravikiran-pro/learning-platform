"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout title="SIGN UP" subtitle="Create your coding account">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Signup with", email, password);
        }}
        className="mt-6 space-y-4"
      >
        <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <AuthButton text="CREATE ACCOUNT" />
      </form>

      <p className="text-xs text-center font-inter text-black mt-6">
        Already registered? <Link href="/login" className="underline">Login</Link>
      </p>
    </AuthLayout>
  );
}
