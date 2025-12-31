"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGameRealtime } from "@/hooks/useGameRealtime";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function PlayContent() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');
  const router = useRouter();
  const { profile } = useUserProfile();
  const { game, loading, error } = useGameRealtime(gameId ? parseInt(gameId) : null);
  const [playing, setPlaying] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);

  const handlePlayCard = async (cardString: string) => {
    if (!game || playing) return;

    // Prevent playing if game is finished
    if (game.status === 'finished') {
      setPlayError('Game has ended');
      return;
    }

    setPlaying(true);
    setPlayError(null);

    try {
      const response = await fetch(`/api/games/${game.id}/play-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardString }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPlayError(data.error || 'Failed to play card');
        return;
      }

      // Game state will update via realtime
      // The finished screen will show automatically when realtime updates the game status
    } catch (err) {
      setPlayError('Failed to play card');
      console.error(err);
    } finally {
      setPlaying(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error: {error || 'Game not found'}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading profile...</div>
      </div>
    );
  }

  const myParticipant = game.participants.find(p => p.userId === profile.id);
  if (!myParticipant) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-2xl">You are not in this game</div>
      </div>
    );
  }

  // Check if player has finished
  if (myParticipant.hasFinished) {
    const winner = game.participants.find(p => p.rank === 1);
    const bhabhi = game.participants.find(p => !p.hasFinished);

    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="text-4xl font-bold text-green-500">You got away! 🎉</div>
        <div className="text-xl text-white">Your Rank: #{myParticipant.rank}</div>
        {bhabhi && game.status === 'finished' && (
          <div className="text-xl text-red-500">
            Bhabhi: {bhabhi.user.name}
          </div>
        )}
        <button
          onClick={() => router.push('/room')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Lobby
        </button>
      </div>
    );
  }

  // Game ended
  if (game.status === 'finished') {
    const bhabhi = game.participants.find(p => !p.hasFinished);
    const isBhabhi = bhabhi?.userId === profile.id;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className={`text-4xl font-bold ${isBhabhi ? 'text-red-500' : 'text-green-500'}`}>
          {isBhabhi ? 'You are the Bhabhi! 😢' : 'Game Over!'}
        </div>
        <div className="text-2xl text-white">
          {isBhabhi ? 'Better luck next time!' : `Bhabhi: ${bhabhi?.user.name}`}
        </div>
        <div className="text-xl text-white">Your Rank: #{myParticipant.rank}</div>
        <button
          onClick={() => router.push('/room')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Lobby
        </button>
      </div>
    );
  }

  const myCards = (myParticipant.hand as string[]);
  const isMyTurn = game.currentTurn === profile.id;

  // Get current turn player
  const currentTurnPlayer = game.participants.find(p => p.userId === game.currentTurn);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Game Status */}
      <div className="mb-8 text-center">
        <div className="text-2xl font-bold text-white mb-2">
          {isMyTurn ? "Your Turn!" : `${currentTurnPlayer?.user.name}'s Turn`}
        </div>
        <div className="text-sm text-gray-400">
          Trick #{game.trickNumber || 1} | Cards Left: {myCards.length}
        </div>
      </div>

      {/* Error Display */}
      {playError && (
        <div className="mb-4 px-6 py-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {playError}
        </div>
      )}

      {/* Current Trick Display */}
      {game.currentTrickCards && (game.currentTrickCards as any[]).length > 0 && (
        <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-lg font-semibold text-white mb-4">Current Trick</div>
          <div className="flex gap-4">
            {(game.currentTrickCards as any[]).map((tc: any, index: number) => {
              const player = game.participants.find(p => p.userId === tc.userId);
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-sm text-gray-400">{player?.user.name}</div>
                  <div className="px-4 py-2 bg-gray-700 rounded-lg text-white font-mono text-sm">
                    {tc.card}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* My Hand */}
      <div className="w-full max-w-4xl">
        <div className="text-lg font-semibold text-white mb-4 text-center">Your Hand</div>
        <div className="flex flex-wrap gap-3 justify-center">
          {myCards.map((cardString, index) => (
            <button
              key={index}
              onClick={() => handlePlayCard(cardString)}
              disabled={!isMyTurn || playing}
              className={`
                px-6 py-4 rounded-lg font-mono text-sm font-semibold
                transition-all transform hover:scale-105
                ${isMyTurn && !playing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                }
              `}
            >
              {cardString.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Active Players */}
      <div className="mt-8 p-4 bg-gray-800/30 rounded-lg">
        <div className="text-sm font-semibold text-white mb-2">Players</div>
        <div className="flex gap-4">
          {game.participants
            .filter(p => !p.hasFinished)
            .map((p, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg text-sm ${
                  p.userId === game.currentTurn
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {p.user.name} ({(p.hand as string[]).length})
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
