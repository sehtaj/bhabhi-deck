"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TutorialPage() {
  const steps = [
    {
      title: "1. The Goal 🎯",
      description: "Be the first to get rid of all your cards — or be crowned the Bhabhi if you fail.",
      image: "/assets/tutorial/goal.png",
    },
    {
      title: "2. Card Order 🂡",
      description: "Aces are high, followed by K, Q, J… down to 2. Suits determine who wins each round.",
      image: "/assets/tutorial/rank.png",
    },
    {
      title: "3. Game Start 🚀",
      description: "The dealer gives all cards evenly. The player with the Ace of Spades leads first.",
      image: "/assets/tutorial/start.png",
    },
    {
      title: "4. Playing a Round ♠️",
      description: "Follow the lead suit if possible. If not, discard any card — but risk picking up later!",
      image: "/assets/tutorial/round.png",
    },
    {
      title: "5. Winning a Trick 🏆",
      description: "The highest card in the lead suit takes the pile and leads the next round.",
      image: "/assets/tutorial/win.png",
    },
    {
      title: "6. No Card to Play ❌",
      description: "If you can't follow the suit, you must pick up the entire pile — so play wisely.",
      image: "/assets/tutorial/pickup.png",
    },
    {
      title: "7. Last Card 🔥",
      description: "Play your last card carefully. Timing it right can win or lose the match.",
      image: "/assets/tutorial/last.png",
    },
    {
      title: "8. End of Game 👑",
      description: "The player left holding cards at the end becomes the *Bhabhi* — the ultimate loser!",
      image: "/assets/tutorial/end.png",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-8 md:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-5xl md:text-6xl font-extrabold mb-16"
        >
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,0,0.5)]">
            How to Play
          </span>
        </motion.h1>

        {/* Tutorial Steps */}
        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                i % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Section */}
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-red-400">{step.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Image Section */}
              <div className="flex-1 flex justify-center items-center">
                <div className="w-64 h-40 md:w-72 md:h-48 rounded-2xl border border-red-600/30 bg-black/40 shadow-[0_0_20px_rgba(255,0,0,0.2)] flex items-center justify-center overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={288}
                    height={192}
                    className="object-cover rounded-xl opacity-90"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-gray-400 text-lg mb-6">
            That’s it — you’re ready to play and dominate the deck.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            Play Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}