"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function NavBar() {
  const { user, loading } = useAuth();
  const { profile } = useUserProfile();
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
          Bhabhi-Deck
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
          <li>
            <DropdownMenu
              trigger={
                <Avatar
                  src={profile?.avatarUrl}
                  alt={profile?.name || 'User'}
                  fallback={profile?.name || profile?.username || 'U'}
                  size="md"
                />
              }
            >
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <Typography variant="small" className="text-gray-300">
                  Profile
                </Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <Typography variant="small" className="text-gray-300">
                  Logout
                </Typography>
              </DropdownMenuItem>
            </DropdownMenu>
          </li>
        )}

        {!loading && !user && (
          <li>
            <Link href="/login?redirectTo=/" passHref>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                <Typography variant="small" className="text-white">
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