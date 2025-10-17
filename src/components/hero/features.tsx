export function Features() {
  const features = [
    "Multiplayer battles",
    "Deck building strategy",
    "Leaderboards and stats",
    "Customizable avatars",
  ];

  return (
    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="p-6 rounded-xl bg-gray-900/50 hover:bg-red-900/60 shadow-lg hover:shadow-red-600/50 transition transform hover:-translate-y-1 cursor-pointer"
        >
          <p className="text-red-500 font-semibold mb-2">{feature}</p>
          <p className="text-gray-300 text-sm">
            This is a brief description for "{feature}" feature. Customize it as needed.
          </p>
        </div>
      ))}
    </div>
  );
}