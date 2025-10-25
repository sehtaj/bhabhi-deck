'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Typography } from '../ui/typography';

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Floating Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ace of Spades - Top Left */}
        <motion.div
          className="absolute top-32 left-12 opacity-25"
          animate={{
            y: [0, -30, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-36 h-52 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-red-500/30 rounded-xl shadow-2xl shadow-red-900/30 p-4 relative backdrop-blur-sm">
            <div className="absolute top-3 left-3">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♠</div>
            </div>
            <div className="text-red-500 text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">♠</div>
            <div className="absolute bottom-3 right-3 rotate-180">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♠</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl" />
          </div>
        </motion.div>

        {/* Ace of Hearts - Top Right */}
        <motion.div
          className="absolute top-24 right-16 opacity-25"
          animate={{
            y: [0, 30, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-36 h-52 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-red-500/30 rounded-xl shadow-2xl shadow-red-900/30 p-4 relative backdrop-blur-sm">
            <div className="absolute top-3 left-3">
              <div className="text-red-600 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-600 text-3xl -mt-1">♥</div>
            </div>
            <div className="text-red-600 text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">♥</div>
            <div className="absolute bottom-3 right-3 rotate-180">
              <div className="text-red-600 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-600 text-3xl -mt-1">♥</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl" />
          </div>
        </motion.div>

        {/* Ace of Diamonds - Bottom Left */}
        <motion.div
          className="absolute bottom-32 left-24 opacity-25"
          animate={{
            y: [0, -25, 0],
            rotate: [3, -3, 3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-36 h-52 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-red-500/30 rounded-xl shadow-2xl shadow-red-900/30 p-4 relative backdrop-blur-sm">
            <div className="absolute top-3 left-3">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♦</div>
            </div>
            <div className="text-red-500 text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">♦</div>
            <div className="absolute bottom-3 right-3 rotate-180">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♦</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl" />
          </div>
        </motion.div>

        {/* Ace of Clubs - Bottom Right */}
        <motion.div
          className="absolute bottom-24 right-12 opacity-25"
          animate={{
            y: [0, 25, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <div className="w-36 h-52 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-red-500/30 rounded-xl shadow-2xl shadow-red-900/30 p-4 relative backdrop-blur-sm">
            <div className="absolute top-3 left-3">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♣</div>
            </div>
            <div className="text-red-500 text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">♣</div>
            <div className="absolute bottom-3 right-3 rotate-180">
              <div className="text-red-500 text-2xl font-bold tracking-tight">A</div>
              <div className="text-red-500 text-3xl -mt-1">♣</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-6"
          >
            <Typography variant="h1">
              <span className="text-white">Play Cards</span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Dominate Online
              </span>
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Typography variant="body" className="text-gray-400 text-center">
              Challenge friends, master strategies, and rise to the top in every game.
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/room">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 px-8 py-6 shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition-all duration-300"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                <Typography variant="button">Start Playing</Typography>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, label: 'Active Players', value: '50K+' },
              { icon: Gamepad2, label: 'Games Played', value: '1M+' },
              { icon: Trophy, label: 'Tournaments', value: '500+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-800/50 flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-red-400" />
                </div>
                <Typography variant="h5" className="text-white">
                  {stat.value}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-600">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-red-800/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-red-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}