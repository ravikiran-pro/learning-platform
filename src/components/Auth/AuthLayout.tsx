"use client";

import React from "react";

export default function AuthLayout({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4">
      <div className="w-full max-w-md bg-white border border-black rounded-sm p-8">
        <h1 className="font-mono font-bold text-2xl text-black text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="font-inter text-[13px] text-center text-gray-700 mt-1">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}