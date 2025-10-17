import { Features } from "./features";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
        Bhabhi Deck
      </h1>
      <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-xl">
        Online multiplayer card game. Challenge players around the World and climb the leaderboard.
      </p>

      <Features />
    </section>
  );
}