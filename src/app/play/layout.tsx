import "@/styles/globals.css";
import { ReactNode } from "react";

export default function PlayLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative text-white overflow-x-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Centered table and children */}
      <div className="w-full flex flex-col items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}