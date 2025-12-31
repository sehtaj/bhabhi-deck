'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { GradientText } from "@/components/ui/gradient-text";
import { CopyButton } from "@/components/ui/copy-button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { useGameRealtime } from "@/hooks/useGameRealtime";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Alert } from "@/components/ui/alert";

export default function RoomContent() {
  const router = useRouter();
  const { profile } = useUserProfile();

  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [gameId, setGameId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { game, loading: gameLoading, isConnected } = useGameRealtime(gameId);

  // Redirect to play when game starts
  useEffect(() => {
    if (game && game.status === 'in_progress') {
      router.push('/play');
    }
  }, [game, router]);

  const handleCreateRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/games/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxPlayers }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create room');
      }

      const data = await response.json();
      setGameId(data.game.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinRoomCode.toUpperCase() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to join room');
      }

      const data = await response.json();
      setGameId(data.game.id);
      setShowJoin(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReady = async () => {
    if (!gameId || !profile) return;

    const myParticipant = game?.participants.find(p => p.userId === profile.id);
    if (!myParticipant) return;

    setLoading(true);
    try {
      await fetch(`/api/games/${gameId}/ready`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isReady: !myParticipant.isReady }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ready status');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = async () => {
    if (!gameId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/games/${gameId}/start`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to start game');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setGameId(null);
    setShowCreate(false);
    setShowJoin(false);
    setError(null);
  };

  // Get current user's participant data
  const myParticipant = game && profile ? game.participants.find(p => p.userId === profile.id) : null;
  const isCreator = game && profile ? game.createdBy === profile.id : false;
  const allReady = game ? game.participants.every(p => p.isReady) : false;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative min-h-screen flex flex-col justify-center px-6 py-12 max-w-6xl mx-auto">

      {/* Home Screen - Choose Create or Join */}
      {!showJoin && !showCreate && !game && (
        <>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">
              <GradientText variant="red">Game Rooms</GradientText>
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

              <Button className="w-full bg-white hover:bg-zinc-300 text-black py-5 text-base font-medium transition-all duration-200 mt-4">
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

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-medium transition-all duration-200 mt-4">
                Create Game
              </Button>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Join Room Form */}
      {showJoin && !game && (
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

            {error && <Alert variant="error" className="mb-4">{error}</Alert>}

            <div className="space-y-6">
              <FormInput
                type="text"
                value={joinRoomCode}
                onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                className="text-lg text-center tracking-widest uppercase font-mono"
                maxLength={6}
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowJoin(false);
                    setError(null);
                  }}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-5 text-base font-medium border border-zinc-700"
                  disabled={loading}
                >
                  <Icon icon="solar:arrow-left-bold" className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleJoinRoom}
                  disabled={joinRoomCode.length !== 6 || loading}
                  className="flex-1 bg-white hover:bg-zinc-100 text-black py-5 text-base font-medium"
                >
                  {loading ? 'Joining...' : 'Join Game'}
                  <Icon icon="solar:alt-arrow-right-bold" className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Form */}
      {showCreate && !game && (
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

            {error && <Alert variant="error" className="mb-4">{error}</Alert>}

            <div className="space-y-6">
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
                  onClick={() => {
                    setShowCreate(false);
                    setError(null);
                  }}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-5 text-base font-medium border border-zinc-700"
                  disabled={loading}
                >
                  <Icon icon="solar:arrow-left-bold" className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateRoom}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 text-white py-5 text-base font-medium"
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Room */}
      {game && (
        <div className="max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-lg bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold-duotone" className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-1 text-white">Waiting Room</h2>
              <p className="text-zinc-400 text-sm">Share this code with your friends</p>
            </div>

            {/* Room Code */}
            <div className="relative mb-6">
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-6 relative">
                <CopyButton
                  text={game.code}
                  variant="default"
                  size="sm"
                  className="absolute top-3 right-3 p-2 hover:bg-zinc-800 border-0 bg-transparent"
                />

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon icon="solar:key-bold-duotone" className="w-3.5 h-3.5 text-zinc-500" />
                  <div className="text-xs font-medium text-zinc-500 text-center tracking-wider uppercase">Room Code</div>
                </div>
                <p className="text-4xl font-bold tracking-[0.5em] text-white font-mono text-center">
                  {game.code}
                </p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                <span className="text-xs text-zinc-400">{isConnected ? 'Connected' : 'Connecting...'}</span>
              </div>
              <Badge variant="default" className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs">
                {game.currentPlayers}/{game.maxPlayers} Players
              </Badge>
            </div>

            {/* Players List */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 mb-5 space-y-2">
              {game.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between py-2 px-3 bg-zinc-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      {participant.user.avatarUrl ? (
                        <img src={participant.user.avatarUrl} alt={participant.user.name} className="w-full h-full rounded-full" />
                      ) : (
                        <Icon icon="solar:user-bold" className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {participant.user.username || participant.user.name}
                        {participant.userId === profile?.id && ' (You)'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {participant.isReady ? (
                      <Badge variant="default" className="bg-green-900/50 text-green-400 border border-green-800 text-xs">
                        <Icon icon="solar:check-circle-bold" className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="default" className="bg-yellow-900/50 text-yellow-400 border border-yellow-800 text-xs">
                        <Icon icon="solar:clock-circle-bold" className="w-3 h-3 mr-1" />
                        Waiting
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: game.maxPlayers - game.currentPlayers }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center gap-3 py-2 px-3 bg-zinc-900/30 rounded-lg border border-dashed border-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Icon icon="solar:user-plus-bold" className="w-4 h-4 text-zinc-600" />
                  </div>
                  <p className="text-sm text-zinc-600">Waiting for player...</p>
                </div>
              ))}
            </div>

            {error && <Alert variant="error" className="mb-4">{error}</Alert>}

            {/* Actions */}
            <div className="space-y-2.5">
              {/* Ready Button (for non-creator or creator who isn't ready) */}
              <Button
                onClick={handleToggleReady}
                disabled={loading}
                className={`w-full font-medium py-4 text-sm transition-all ${
                  myParticipant?.isReady
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {loading ? (
                  'Updating...'
                ) : myParticipant?.isReady ? (
                  <>
                    <Icon icon="solar:close-circle-bold" className="mr-2 h-4 w-4" />
                    Not Ready
                  </>
                ) : (
                  <>
                    <Icon icon="solar:check-circle-bold" className="mr-2 h-4 w-4" />
                    Ready
                  </>
                )}
              </Button>

              {/* Start Game Button (only for creator) */}
              {isCreator && (
                <Button
                  onClick={handleStartGame}
                  disabled={!allReady || game.currentPlayers < 2 || loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-4 text-sm transition-all"
                >
                  <Icon icon="solar:play-bold" className="mr-2 h-4 w-4" />
                  {loading ? 'Starting...' : 'Start Game'}
                </Button>
              )}

              {/* Leave Room */}
              <Button
                onClick={handleBackToHome}
                className="w-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent py-4 text-sm font-medium transition-all"
              >
                <Icon icon="solar:logout-3-bold" className="mr-2 h-3.5 w-3.5" />
                Leave Room
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
