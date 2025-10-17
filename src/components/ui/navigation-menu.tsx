"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tutorial", label: "Tutorial" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
    { href: "/play", label: "Play Now", isButton: true },
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Bhabhi Deck
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.isButton ? (
              <Link
                key={link.href}
                href={link.href}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-yellow-400 transition"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Menu
            className="cursor-pointer"
            size={24}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.isButton ? (
              <Link
                key={link.href}
                href={link.href}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};