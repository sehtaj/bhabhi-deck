"use client";

import { useEffect, useState } from "react";
import Table from "@/components/game/table";
import PlayerAvatar from "@/components/game/playerAvatar";
import MyHand from "@/components/game/myHand";

export type CardType = {
  id: number;
  cardName: string;
  dealt: boolean;
  playerIndex: number;
};

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const createDeck = (): CardType[] => {
  let id = 0;
  const deck: CardType[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ id: id++, cardName: `${rank}_of_${suit}`, dealt: false, playerIndex: -1 });
    }
  }
  return deck;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function PlayPage() {
  const [cards, setCards] = useState<CardType[]>(createDeck());
  const [myCards, setMyCards] = useState<CardType[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [dealingStarted, setDealingStarted] = useState(false);

  const players = [
    { name: "Player 1", position: { top: "-200px", left: "50%", transform: "translateX(-50%)" }, badgeColor: "blue" },
    { name: "Player 2", position: { top: "50%", right: "0", transform: "translateY(-50%)" }, badgeColor: "purple" },
    { name: "You", position: { bottom: "0", left: "50%", transform: "translateX(-50%)" }, badgeColor: "green" },
    { name: "Player 4", position: { top: "50%", left: "0", transform: "translateY(-50%)" }, badgeColor: "cyan" },
  ];

  useEffect(() => {
    setShuffledOrder(shuffleArray(cards.map((_, i) => i)));
  }, []);

  useEffect(() => {
    if (!shuffledOrder.length) return;
    const timer = setTimeout(() => {
      startDealing();
    }, 500);
    return () => clearTimeout(timer);
  }, [shuffledOrder]);

  const startDealing = () => {
    setDealingStarted(true);
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 52) {
        clearInterval(interval);
        return;
      }
      const cardIndex = shuffledOrder[count];
      const playerIndex = count % 4;

      setCards(prev => {
        const newCards = [...prev];
        newCards[cardIndex] = { ...newCards[cardIndex], dealt: true, playerIndex };
        return newCards;
      });

      if (playerIndex === 2) {
        setMyCards(prev => {
          const card = cards[cardIndex];
          if (prev.some(c => c.id === card.id)) return prev;
          return [...prev, { ...card, dealt: true, playerIndex: 2 }];
        });
      }

      count++;
    }, 80);
  };

  const getPlayerCardPosition = (playerIndex: number, cardIndexInHand: number) => {
    const positions = {
      0: { x: -50, y: -300 },
      1: { x: 410, y: 0 },
      2: { x: 0, y: 300 },
      3: { x: -470, y: 0 },
    };
    const basePos = positions[playerIndex as keyof typeof positions];
    const spreadOffset = (cardIndexInHand - 6) * 8;
    return { x: basePos.x + (playerIndex % 2 === 0 ? spreadOffset : 0), y: basePos.y + (playerIndex % 2 === 1 ? spreadOffset : 0) };
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      {/* Opponent avatars */}
      {players.map((p, i) => i !== 2 && (
        <PlayerAvatar key={i} name={p.name} cardCount={cards.filter(c => c.playerIndex === i && c.dealt).length} position={p.position} badgeColor={p.badgeColor} />
      ))}

      <Table cards={cards} getPlayerCardPosition={getPlayerCardPosition} />

      <MyHand myCards={myCards} />
    </div>
  );
}