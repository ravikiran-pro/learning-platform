"use client";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthInput({ label, ...props }: AuthInputProps) {
  return (
    <div>
      <label className="block font-mono text-xs font-medium tracking-wide text-black">
        {label.toUpperCase()}
      </label>
      <input
        className="w-full mt-1 p-2.5 border border-black rounded-sm font-mono text-sm bg-white text-black placeholder-gray-500 focus:outline-none"
        {...props}
      />
    </div>
  );
}