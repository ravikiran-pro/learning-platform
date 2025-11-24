"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { AuthInput } from "@/components/AuthInput";
import { AuthButton } from "@/components/AuthButton";
import { OAuthButtons } from "@/components/OAuthButtons";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session, status: authStatus } = useSession();

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push("/"); 
    }
  }, [authStatus, router]);

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/solve/69220bc1fdf8d75fcec38380");
    }
  }

  return (
    <AuthLayout title="LOGIN" subtitle="Access your coding workspace">
      <form onSubmit={handleCredentialsLogin} className="mt-6 space-y-4">
        <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-600 text-xs font-mono">{error}</p>}

        <AuthButton text="LOGIN" />
      </form>

      <OAuthButtons />

      <p className="text-xs text-center font-inter text-black mt-6">
        New here? <Link href="/signup" className="underline">Create account</Link>
      </p>
    </AuthLayout>
  );
}
