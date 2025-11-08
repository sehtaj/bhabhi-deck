'use client';
import Link from "next/link";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function RoomContent() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackToCreate = () => {
    setRoomCode("");
    setPlayerName("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-transparent bg-clip-text animate-pulse">
        Multiplayer Room
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
        <div className="w-full max-w-md bg-gradient-to-b from-red-950/40 to-red-950/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-900/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl mb-6 font-bold text-red-400">Join Room</h2>
          <input
            type="text"
            placeholder="Enter Room Code"
            className="w-full px-5 py-4 rounded-xl bg-black/70 border-2 border-red-800 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition-all"
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
        </div>
      )}

      {showCreate && !roomCode && (
        <div className="w-full max-w-md bg-gradient-to-b from-red-950/40 to-red-950/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-900/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl mb-6 font-bold text-red-400">Create a New Room</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full px-5 py-4 rounded-xl bg-black/70 border-2 border-red-800 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition-all"
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
        </div>
      )}

      {roomCode && (
        <div className="w-full max-w-md bg-gradient-to-b from-red-950/40 to-red-950/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-red-900/50 animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-900/40 border border-green-700/60 rounded-full mb-5">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-green-400 text-sm font-semibold">Room Created Successfully</span>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-red-400">Your Room Code</h2>
            <p className="text-gray-400">Share this code with your friends</p>
          </div>

          <div className="relative mb-8">
            <div className="bg-black/80 border-2 border-red-700 rounded-2xl p-8 mb-4 shadow-inner shadow-red-900/50">
              <p className="text-6xl font-bold tracking-widest text-red-500 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                {roomCode}
              </p>
            </div>

            <Button
              onClick={copyToClipboard}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-4 text-lg transition-all duration-200 shadow-lg shadow-red-900/50 hover:shadow-xl"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Room Code
                </>
              )}
            </Button>
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
            <p className="text-sm text-gray-400 mb-4">
              Waiting for players to join...
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-75 shadow-lg shadow-red-500/50" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-150 shadow-lg shadow-red-500/50" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
