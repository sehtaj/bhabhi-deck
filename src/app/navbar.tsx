"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="text-2xl font-bold text-white">logo</div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link href="/" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/tutorial" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200">
            Tutorial
          </Link>
        </li>
        <li>
          <Link href="/profile" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200">
            Settings
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <Button variant="default" className="bg-red-600 text-white hover:bg-red-700">
              <span>Login</span>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}