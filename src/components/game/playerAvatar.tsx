// components/PlayerAvatar.tsx
"use client";

import { User } from "lucide-react";

interface PlayerAvatarProps {
  name: string;
  cardCount: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  badgeColor?: string;
}

export default function PlayerAvatar({ name, cardCount, position, badgeColor = "blue" }: PlayerAvatarProps) {
  return (
    <div className="absolute" style={position}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-xl backdrop-blur-xl">
          <User className="w-7 h-7 text-slate-300" />
        </div>
        <div className="px-4 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/50 backdrop-blur-xl shadow-lg">
          <p className="text-sm text-slate-200 font-semibold">{name}</p>
        </div>
        <div className={`px-3 py-1 rounded-lg bg-${badgeColor}-500/20 border border-${badgeColor}-400/30 backdrop-blur-sm`}>
          <p className={`text-xs text-${badgeColor}-300 font-bold`}>{cardCount} cards</p>
        </div>
      </div>
    </div>
  );
}