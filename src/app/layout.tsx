// app/layout.tsx
import "styles/globals.css";
import { ReactNode } from 'react';
import { NavBar } from "./navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">
        {/* Global Animated Background */}
        <div className="absolute inset-0 -z-10">
          {/* Subtle red glow layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}