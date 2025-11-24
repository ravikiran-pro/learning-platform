"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/Auth/AuthLayout";
import { AuthInput } from "@/components/Auth/AuthInput";
import { AuthButton } from "@/components/Auth/AuthButton";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/Auth/OtpInput";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1); // Step control
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success/Error message
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    setMessage("OTP sent to your email.");
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP sent to your email.");
        setStep(2);

        // 🔥 Start countdown here
        setCanResend(false);
        setTimer(30);

        const interval = setInterval(() => {
          setTimer((t) => {
            if (t <= 1) {
              clearInterval(interval);
              setCanResend(true);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
      } else {
        setMessage(data.error || "Failed to send OTP.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP + Create account
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully!");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setMessage(data.error || "OTP verification failed.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="SIGN UP" subtitle="Create your coding account">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
          <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <AuthButton text={loading ? "Sending..." : "SEND OTP"} />
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
          <div>
            <OtpInput length={6} onChange={(val) => setOtp(val)} />
          </div>
          <div className="pt-3">
            <AuthButton text={loading ? "Verifying..." : "VERIFY OTP"} />
          </div>
        </form>
      )}

      {message && <p className="text-xs text-center text-red-600 mt-2">{message}</p>}

      {step === 1 && (
        <p className="text-xs text-center font-inter text-black mt-6">
          Already registered? <Link href="/login" className="underline">Login</Link>
        </p>
      )}

      {step === 2 && (
        <p className="text-xs text-center font-inter text-black mt-6">
          Didn’t receive OTP?{" "}
          {!canResend ? (
            <span className="text-gray-500 opacity-70">Resend in {timer}s</span>
          ) : (
            <button className="underline" onClick={handleSendOtp} type="button">
              Resend
            </button>
          )}
        </p>
      )}

    </AuthLayout>
  );
}
