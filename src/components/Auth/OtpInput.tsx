"use client";

import { useState, useRef } from "react";

export default function OtpInput({
  length = 6,
  onChange,
}: {
  length?: number;
  onChange: (value: string) => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const updateOtp = (newOtp: string[]) => {
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    updateOtp(newOtp);

    if (value && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").concat(Array(length).fill("")).slice(0, length);
    updateOtp(newOtp);

    // focus next available input or last
    const nextIndex = newOtp.findIndex((val) => val === "");
    inputsRef.current[nextIndex === -1 ? length - 1 : nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className="
            w-10 h-12 border border-black rounded-sm 
            text-center font-mono text-lg font-bold
            focus:outline-none focus:ring-2 focus:ring-black text-gray-600
          "
        />
      ))}
    </div>
  );
}
