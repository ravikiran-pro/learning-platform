"use client";

export function AuthButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3.5 bg-black text-white font-mono text-sm font-semibold rounded-sm hover:bg-[#111] transition"
    >
      {text}
    </button>
  );
}