'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function HeaderNav() {
  const logOut = () => {
    signOut()
  }

  return (
    <header className="flex justify-between items-center">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-700 text-sm">
          Welcome back. Let&apos;s make progress.
        </p>
      </div>

      {/* Right Side - Navigation + Logout */}
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-800">
          <Link href="/js" className="hover:text-black">
            JavaScript Track
          </Link>
          <Link href="/js/prep" className="hover:text-black">
            Interview Preparation
          </Link>
          <Link href="/mentor" className="hover:text-black">
            AI Mentor
          </Link>
          <Link href="/profile" className="hover:text-black">
            Profile
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => logOut()}
          className="text-sm text-gray-600 hover:text-black cursor-pointer"
        >
          Logout
        </button>

      </div>
    </header>
  );
}
