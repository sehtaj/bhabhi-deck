"use client";

import { motion } from "framer-motion";
import { Globe, Calendar } from "lucide-react";
import { stats, recentMatches } from "lib/mockProfile";

export default function ProfilePage() {
  return (
    <section className="min-h-screen flex flex-col items-center px-8 py-20 text-white relative z-10">
      {/* Profile Header */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar Card */}
        <div className="bg-[#100000]/40 rounded-2xl p-8 border border-red-700/30 shadow-[0_0_25px_rgba(255,0,0,0.2)] flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full bg-red-900/40 border border-red-600/50 shadow-[0_0_30px_rgba(255,0,0,0.3)] mb-4 flex items-center justify-center text-4xl font-bold text-red-500">
            A
          </div>
          <h1 className="text-3xl font-bold mb-2">Player One</h1>
          <p className="text-gray-400">Joined • Jan 2024</p>
        </div>

        {/* Info Cards */}
        <div className="bg-[#100000]/40 rounded-2xl p-8 border border-red-700/30 flex flex-col justify-center">
          <div className="flex items-center mb-2 text-gray-300">
            <Calendar className="w-5 h-5 mr-3 text-red-500" />
            <span>Account Age: 1 Year</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Globe className="w-5 h-5 mr-3 text-red-500" />
            <span>Region: India 🇮🇳</span>
          </div>
        </div>

        {/* XP & Level */}
        <div className="bg-[#100000]/40 rounded-2xl p-8 border border-red-700/30 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl mb-2 font-semibold">Level 5</h2>
          <p className="text-gray-400 mb-2">2300 XP</p>
          <div className="w-full bg-red-900/30 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[70%]"></div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center bg-[#100000]/40 rounded-2xl p-6 border border-red-700/30 shadow-[0_0_25px_rgba(255,0,0,0.2)] hover:shadow-[0_0_35px_rgba(255,0,0,0.35)] transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-3">{stat.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
            <p className="text-gray-400 text-base">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Matches */}
      <motion.div
        className="max-w-6xl w-full bg-[#100000]/40 rounded-2xl border border-red-700/30 p-8 shadow-[0_0_25px_rgba(255,0,0,0.2)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-6">Recent Matches</h2>
        <div className="space-y-4">
          {recentMatches.map((match, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-[#1a0000]/40 rounded-xl px-6 py-3 border border-red-800/20"
            >
              <p className="w-1/5 font-medium">{match.opponent}</p>
              <p
                className={`w-1/5 ${
                  match.result === "Win" ? "text-green-400" : "text-red-400"
                } font-semibold`}
              >
                {match.result}
              </p>
              <p className="w-1/5 text-gray-500">{match.date}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}