"use client";

import { CardType } from "@/components/game/table";
import { PlayingCard } from "@/components/game/playing-card";

interface MyHandProps {
  myCards: CardType[];
}

export default function MyHand({ myCards }: MyHandProps) {
  return (
    <div className="absolute bottom-[-270px] left-1/2 -translate-x-1/2 translate-y-[-60px] z-[300] w-full max-w-5xl">
      <div className="text-center bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.1)]">My Cards
        <div className="flex flex-wrap gap-2 justify-center">
          {myCards.map(card => (
            <PlayingCard
              key={card.id}
              cardName={card.cardName}
              size="md"
              hoverEffect="lift"
            />
          ))}
        </div>
      </div>
    </div>
  );
}