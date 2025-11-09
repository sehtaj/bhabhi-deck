'use client';
import Link from "next/link";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { GradientText } from "@/components/ui/gradient-text";
import { CopyButton } from "@/components/ui/copy-button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

export default function RoomContent() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);

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
    setMaxPlayers(4);
  };

  const handleBackFromCreate = () => {
    setShowCreate(false);
    setPlayerName("");
    setMaxPlayers(4);
  };

  return (
    <div className="min-h-screen relative">
      {/* Vercel-style Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative min-h-screen flex flex-col justify-center px-6 py-12 max-w-6xl mx-auto">

      {!showJoin && !showCreate && !roomCode && (
        <>
          {/* Dashboard Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">
              <GradientText variant="red">
                Game Rooms
              </GradientText>
            </h1>
            <p className="text-gray-400 text-lg">Choose an option to get started</p>
          </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {/* Join Room Panel */}
          <div
            className="relative p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              setShowJoin(true);
              setShowCreate(false);
            }}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-2 group-hover:bg-zinc-800 transition-all duration-300">
                <Icon icon="solar:users-group-rounded-bold-duotone" className="w-8 h-8 text-zinc-400" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Join Room</h3>
                <p className="text-zinc-400 text-sm">Enter a room code to join your friends</p>
              </div>

              <Button
                className="w-full bg-white hover:bg-zinc-300 text-black py-5 text-base font-medium transition-all duration-200 mt-4"
              >
                Join Game
              </Button>
            </div>
          </div>

          {/* Create Room Panel */}
          <div
            className="relative p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              setShowCreate(true);
              setShowJoin(false);
            }}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-2 group-hover:bg-zinc-800 transition-all duration-300">
                <Icon icon="solar:add-square-bold-duotone" className="w-8 h-8 text-zinc-400" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Create Room</h3>
                <p className="text-zinc-400 text-sm">Start a new game and invite players</p>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-medium transition-all duration-200 mt-4"
              >
                Create Game
              </Button>
            </div>
          </div>
        </div>
        </>
      )}

      {showJoin && !roomCode && (
        <div className="max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Icon icon="solar:login-3-bold-duotone" className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Join Room</h2>
                <p className="text-zinc-400 text-sm">Enter the 6-character room code</p>
              </div>
            </div>

            <div className="space-y-6">
              <FormInput
                type="text"
                placeholder="XXXXXX"
                className="text-lg text-center tracking-widest uppercase font-mono"
                maxLength={6}
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowJoin(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-5 text-base font-medium border border-zinc-700"
                >
                  <Icon icon="solar:arrow-left-bold" className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button className="flex-1 bg-white hover:bg-zinc-100 text-black py-5 text-base font-medium">
                  Join Game
                  <Icon icon="solar:alt-arrow-right-bold" className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreate && !roomCode && (
        <div className="max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Icon icon="solar:add-circle-bold-duotone" className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Create Room</h2>
                <p className="text-zinc-400 text-sm">Set up a new game room</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Room Name</label>
                <FormInput
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter room name"
                  className="text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Number of Players</label>
                <div className="relative">
                  <select
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="w-full appearance-none bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 pr-10 text-white text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value={2}>2 Players</option>
                    <option value={3}>3 Players</option>
                    <option value={4}>4 Players</option>
                    <option value={5}>5 Players</option>
                    <option value={6}>6 Players</option>
                    <option value={7}>7 Players</option>
                    <option value={8}>8 Players</option>
                  </select>
                  <Icon
                    icon="solar:alt-arrow-down-bold"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBackFromCreate}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-5 text-base font-medium border border-zinc-700"
                >
                  <Icon icon="solar:arrow-left-bold" className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateRoom}
                  disabled={!playerName.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 text-white py-5 text-base font-medium"
                >
                  Create Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {roomCode && (
        <div className="max-w-lg mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-lg bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold-duotone" className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-1 text-white">Room Ready</h2>
              <p className="text-zinc-400 text-sm">Share this code with your friends</p>
            </div>

            <div className="relative mb-6">
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-6 relative">
                <CopyButton
                  text={roomCode}
                  variant="default"
                  size="sm"
                  className="absolute top-3 right-3 p-2 hover:bg-zinc-800 border-0 bg-transparent"
                />

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon icon="solar:key-bold-duotone" className="w-3.5 h-3.5 text-zinc-500" />
                  <div className="text-xs font-medium text-zinc-500 text-center tracking-wider uppercase">Room Code</div>
                </div>
                <p className="text-4xl font-bold tracking-[0.5em] text-white font-mono text-center">
                  {roomCode}
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:users-group-rounded-bold-duotone" className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-300">Players in Room</span>
                </div>
                <Badge variant="default" className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs">1/{maxPlayers}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                Waiting for players...
              </div>
            </div>

            <div className="space-y-2.5">
              <Link href="/play" className="block">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 text-sm transition-all"
                >
                  <Icon icon="solar:play-bold" className="mr-2 h-4 w-4" />
                  Start Game
                </Button>
              </Link>

              <Button
                onClick={handleBackToCreate}
                className="w-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent py-4 text-sm font-medium transition-all"
              >
                <Icon icon="solar:refresh-bold" className="mr-2 h-3.5 w-3.5" />
                Create Another Room
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
