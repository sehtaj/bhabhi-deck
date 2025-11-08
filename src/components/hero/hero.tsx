'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Typography } from '../ui/typography';
import { GradientText } from '../ui/gradient-text';
import { FloatingCard } from '../decorative/floating-card';

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Floating Cards */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingCard
          suit="spades"
          position={{ top: '8rem', left: '3rem' }}
          animationConfig={{
            yRange: [0, -30, 0],
            rotateRange: [-5, 5, -5],
            duration: 6,
          }}
        />

        <FloatingCard
          suit="hearts"
          position={{ top: '6rem', right: '4rem' }}
          animationConfig={{
            yRange: [0, 30, 0],
            rotateRange: [5, -5, 5],
            duration: 7,
            delay: 0.5,
          }}
        />

        <FloatingCard
          suit="diamonds"
          position={{ bottom: '8rem', left: '6rem' }}
          animationConfig={{
            yRange: [0, -25, 0],
            rotateRange: [3, -3, 3],
            duration: 8,
            delay: 1,
          }}
        />

        <FloatingCard
          suit="clubs"
          position={{ bottom: '6rem', right: '3rem' }}
          animationConfig={{
            yRange: [0, 25, 0],
            rotateRange: [-3, 3, -3],
            duration: 7.5,
            delay: 1.5,
          }}
        />
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
              <GradientText variant="red">
                Dominate Online
              </GradientText>
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
      </div>
    </div>
  );
}