import { Trophy, Zap, User, Calendar } from "lucide-react"; // removed Shield as Losses is gone

export const stats = [
  { icon: <Calendar className="w-6 h-6 text-red-500" />, label: "Total Matches", value: 3 }, // total matches = recentMatches.length
  { icon: <Trophy className="w-6 h-6 text-red-500" />, label: "Total Wins", value: 45 },
  { icon: <Zap className="w-6 h-6 text-red-500" />, label: "Win Rate", value: "61%" },
  { icon: <User className="w-6 h-6 text-red-500" />, label: "Best Streak", value: "7 Wins" },
];

export const recentMatches = [
  { opponent: "CrimsonFox", result: "Win", date: "Oct 21" },
  { opponent: "ShadowSoul", result: "Loss", date: "Oct 20" },
  { opponent: "Vortex", result: "Win", date: "Oct 18" },
];