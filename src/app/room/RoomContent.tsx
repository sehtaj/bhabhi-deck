'use client';
import Link from "next/link";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { FormInput } from "@/components/ui/form-input";
import { GradientText } from "@/components/ui/gradient-text";
import { LoadingDots } from "@/components/ui/loading-dots";
import { CopyButton } from "@/components/ui/copy-button";
import { Badge } from "@/components/ui/badge";

export default function RoomContent() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  // Generate a random 6-character room code
  const generateRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCreateRoom = () => {
    if (playerName.trim()) {
      const newRoomCode = generateRoomCode();
      setRoomCode(newRoomCode);
    }
  };

  const handleBackToCreate = () => {
    setRoomCode("");
    setPlayerName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-5xl font-bold mb-12 animate-pulse">
        <GradientText variant="red" animate>
          Multiplayer Room
        </GradientText>
      </h1>

      {!showJoin && !showCreate && !roomCode && (
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <Button
            onClick={() => {
              setShowJoin(true);
              setShowCreate(false);
            }}
            className="bg-red-700 hover:bg-red-800 text-white px-10 py-7 text-xl font-semibold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition-all duration-300 hover:scale-105"
          >
            Join Room
          </Button>

          <Button
            onClick={() => {
              setShowCreate(true);
              setShowJoin(false);
            }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-7 text-xl font-semibold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition-all duration-300 hover:scale-105"
          >
            Create Room
          </Button>
        </div>
      )}

      {showJoin && !roomCode && (
        <GlassCard className="w-full max-w-md p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl mb-6 font-bold text-red-400">Join Room</h2>
          <FormInput
            type="text"
            placeholder="Enter Room Code"
            className="text-lg"
          />
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => setShowJoin(false)}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-4 text-lg font-medium"
            >
              Back
            </Button>
            <Button className="flex-1 bg-red-700 hover:bg-red-800 text-white py-4 text-lg font-semibold shadow-lg shadow-red-900/50">
              Join
            </Button>
          </div>
        </GlassCard>
      )}

      {showCreate && !roomCode && (
        <GlassCard className="w-full max-w-md p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl mb-6 font-bold text-red-400">Create a New Room</h2>
          <FormInput
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Your Name"
            className="text-lg"
          />
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => setShowCreate(false)}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-4 text-lg font-medium"
            >
              Back
            </Button>
            <Button
              onClick={handleCreateRoom}
              disabled={!playerName.trim()}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 text-lg font-semibold shadow-lg shadow-red-900/50"
            >
              Create
            </Button>
          </div>
        </GlassCard>
      )}

      {roomCode && (
        <GlassCard className="w-full max-w-md p-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-8">
            <Badge variant="success" size="lg" className="mb-5">
              ✓ Room Created Successfully
            </Badge>
            <h2 className="text-3xl font-bold mb-3 text-red-400">Your Room Code</h2>
            <p className="text-gray-400">Share this code with your friends</p>
          </div>

          <div className="relative mb-8">
            <div className="bg-black/80 border-2 border-red-700 rounded-2xl p-8 mb-4 shadow-inner shadow-red-900/50">
              <p className="text-6xl font-bold tracking-widest text-red-500 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                {roomCode}
              </p>
            </div>

            <CopyButton
              text={roomCode}
              variant="default"
              size="lg"
              showText
              className="w-full py-4 text-lg"
            />
          </div>

          <div className="space-y-4">
            <Link href = "/play">
            <Button
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-lg shadow-lg shadow-red-900/50 hover:scale-105 transition-all"
            >
              Start Game
            </Button>
            </Link>

            <Button
              onClick={handleBackToCreate}
              className="w-full border-2 border-red-800 text-red-400 hover:bg-red-950/50 hover:text-red-300 bg-transparent py-4 text-lg font-medium transition-all"
            >
              Create Another Room
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-red-900/40">
            <LoadingDots
              color="red"
              size="md"
              message="Waiting for players to join..."
            />
          </div>
        </GlassCard>
      )}
    </div>
  );
}
