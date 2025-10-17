import "../styles/globals.css";
import { NavBar} from "./navbar"

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
      <body className= "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}