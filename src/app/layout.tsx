import "../styles/globals.css";
import { NavBar } from "./navbar"

export const metadata = {
  title: "Bhabhi Deck",
  description: "Online multiplayer game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className= "bg-black text-white min-h-screen">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}