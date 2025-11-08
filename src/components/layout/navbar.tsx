"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function NavBar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

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
        <li>
          <Link
            href="/tutorial"
            className="px-4 py-2 rounded-lg hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200"
          >
            <Typography variant="small" className="text-gray-300 hover:text-white">
              Tutorial
            </Typography>
          </Link>
        </li>

        {!loading && user && (
          <>
            <li>
              <Link
                href="/profile"
                className="px-4 py-2 rounded-lg hover:bg-red-950/50 border border-transparent hover:border-red-900/50 transition-all duration-200"
              >
                <Typography variant="small" className="text-gray-300 hover:text-white">
                  Profile
                </Typography>
              </Link>
            </li>

            {/* User Avatar */}
            <li>
              <Link href="/profile">
                <div className="w-10 h-10 rounded-full bg-red-900/40 border-2 border-red-600/50 shadow-[0_0_15px_rgba(255,0,0,0.3)] flex items-center justify-center text-sm font-bold text-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all cursor-pointer">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              <Button
                onClick={handleSignOut}
                className="bg-red-600/80 text-white hover:bg-red-700"
              >
                <Typography variant="button" className="text-white">
                  Logout
                </Typography>
              </Button>
            </li>
          </>
        )}

        {!loading && !user && (
          <li>
            <Link href="/login" passHref>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                <Typography variant="button" className="text-white">
                  Login
                </Typography>
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}