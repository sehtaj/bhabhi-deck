// app/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google"
import ConditionalNavFooter from "@/components/conditionalNavFooter";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bhabhi-Deck",
  description: "Multiplayer card platform",
  icons: {
    icon: "/logo.svg"
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} relative min-h-screen bg-black text-white overflow-x-hidden`}
      >
        {/* 1️⃣ Base dark gradient */}
        <div className="fixed inset-0 -z-30 bg-gradient-to-b from-[#000000] to-[#111111]" />

        {/* 2️⃣ Center radial glow (soft vignette) */}
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: -20,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 60%)"
        }} />

        <div>{children}</div>
        <ConditionalNavFooter />
      </body>
    </html>
  );
}