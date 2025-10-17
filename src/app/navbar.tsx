// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className=" px-6 py-4 flex justify-between items-center sticky top-0 z-50 ">
      <div className="text-2xl font-bold">logo</div>
      <ul className="flex gap-5">
        <li>
          <Link href="/" className="px-2 py-1 rounded-md hover:text-gray-900 hover:bg-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/tutorial" className="px-2 py-1 rounded-md hover:text-gray-900 hover:bg-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200">
            Tutorial
          </Link>
        </li>
        <li>
          <Link href="/profile" className="px-2 py-1 rounded-md hover:text-gray-900 hover:bg-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings" className="px-2 py-1 rounded-md hover:text-gray-900 hover:bg-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200">
            Settings
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <Button variant="default" className="bg-green-400 text-black hover:bg-green-500">
              <span>Login</span>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}