// components/ConditionalNavFooter.tsx
"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/layout/navbar";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("components/footer"), { ssr: false });

export default function ConditionalNavFooter() {
  const pathname = usePathname();

  // hide NavBar/Footer on /play routes
  if (pathname.startsWith("/play")) return null;

  return (
    <>
      <NavBar />
      <Footer />
    </>
  );
}