"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function OAuthButtons() {
  return (
    <>
      <div className="my-4 text-center font-mono text-xs text-gray-600">― OR ―</div>

      <button
        onClick={() => signIn("github")}
        className="w-full mt-3 py-3.5 bg-black text-white font-mono text-sm flex items-center justify-center gap-2 rounded-sm hover:bg-[#111] transition"
      >
        <FaGithub className="text-lg" />
        <span>Continue with GitHub</span>
      </button>

      <button
        onClick={() => signIn("linkedin")}
        className="w-full mt-3 py-3.5 bg-[#0A66C2] text-white font-mono text-sm flex items-center justify-center gap-2 rounded-sm hover:bg-[#004182] transition"
      >
        <FaLinkedin className="text-lg" />
        <span>Continue with LinkedIn</span>
      </button>
    </>
  );
}
