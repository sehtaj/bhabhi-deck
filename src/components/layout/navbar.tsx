"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export function NavBar() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Hero Image"
          width={60}
          height={60}
        />
        <Typography variant="h6" className="text-white">
          Play Cards
        </Typography>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-5 items-center">
        {[
          { href: "/tutorial", label: "Tutorial" },
          { href: "/profile", label: "Profile" },
          { href: "/settings", label: "Settings" },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="px-4 py-2 rounded-lg hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200"
            >
              <Typography variant="small" className="text-gray-300 hover:text-white">
                {item.label}
              </Typography>
            </Link>
          </li>
        ))}

        {/* Login Button */}
        <li>
          <Link href="/login" passHref>
            <Button className="bg-red-600 text-white hover:bg-red-700">
              <Typography variant="button" className="text-white">
                Login
              </Typography>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}