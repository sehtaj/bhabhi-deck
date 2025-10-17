import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background bg-white", inter.className)}>
          {children}
      </body>
    </html>
  );
}
