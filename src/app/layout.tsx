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
    <html lang="en" className="dark">
      <body className="bg-background text-foreground"> 
          <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}