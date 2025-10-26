"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Globe, Sparkles, Crown, Swords } from "lucide-react";
import { Typography } from "@/components/ui/typography";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience real-time gameplay with zero lag. Our optimized servers ensure every card plays instantly.",
    gradient: "from-red-600 to-orange-600",
  },
  {
    icon: Shield,
    title: "Secure & Fair",
    description:
      "Advanced anti-cheat systems and verified random card distribution. Play with confidence.",
    gradient: "from-red-600 to-pink-600",
  },
  {
    icon: Globe,
    title: "Global Matchmaking",
    description:
      "Connect with players worldwide. Smart matchmaking ensures balanced and competitive games.",
    gradient: "from-red-700 to-red-500",
  },
  {
    icon: Crown,
    title: "Ranked Ladder",
    description:
      "Climb the competitive ladder, earn seasonal rewards, and prove you are the ultimate card master.",
    gradient: "from-red-800 to-red-600",
  },
  {
    icon: Sparkles,
    title: "Premium Customization",
    description:
      "Unlock stunning card backs, avatars, and emotes. Express your unique style at the table.",
    gradient: "from-red-600 to-purple-600",
  },
  {
    icon: Swords,
    title: "Tournament Mode",
    description:
      "Join daily tournaments with real prizes. Compete against the best and earn your place in history.",
    gradient: "from-red-700 to-red-900",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />

      {/* Card */}
      <div className="relative h-full bg-gradient-to-br from-black via-red-950/20 to-black border border-red-900/30 rounded-2xl p-8 hover:border-red-800/50 transition-all duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 shadow-lg shadow-red-900/50`}
        >
          <feature.icon className="w-full h-full text-white" />
        </motion.div>

        {/* Title */}
        <Typography
          variant="h4"
          className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors"
        >
          {feature.title}
        </Typography>

        {/* Description */}
        <Typography variant="small" className="text-gray-400 leading-relaxed">
          {feature.description}
        </Typography>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-950/50 border border-red-800/50 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            <Typography variant="small" className="text-red-300 font-medium">
              Why Choose Us
            </Typography>
          </motion.div>

          <Typography variant="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Unmatched </span>
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              Gaming Experience
            </span>
          </Typography>

          <Typography variant="body" className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for competitive players who demand the best. Every feature designed to enhance your gameplay.
          </Typography>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}