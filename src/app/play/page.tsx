"use client";

import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function PlayPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl aspect-video relative"
        style={{ perspective: "1400px" }}
      >
        {/* Table with 3D perspective */}
        <div  
          className="relative w-full h-full"
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(12deg)" 
          }}
        >
          {/* Outer frame - Futuristic metal/glass edge */}
          <div className="absolute -inset-6 rounded-[4rem] bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(139,92,246,0.15)]">
            {/* Metallic shine bands */}
            <div className="absolute inset-0 rounded-[4rem] bg-[linear-gradient(145deg,transparent_0%,rgba(139,92,246,0.1)_30%,transparent_50%,rgba(59,130,246,0.1)_70%,transparent_100%)]" />
            
            {/* LED underglow effect */}
            <div className="absolute inset-0 rounded-[4rem] shadow-[inset_0_0_40px_rgba(139,92,246,0.2),inset_0_-4px_20px_rgba(59,130,246,0.15)]" />
            
            {/* Glowing edge lines */}
            <div className="absolute inset-3 rounded-[3.5rem] border border-violet-500/20" />
            <div className="absolute inset-4 rounded-[3.25rem] border border-blue-500/10" />
          </div>

          {/* Main table surface - Holographic dark glass */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_-12px_40px_rgba(0,0,0,0.6),inset_0_12px_30px_rgba(139,92,246,0.08)]">
                                    
            {/* Hexagonal grid pattern */}
            <div className="absolute inset-0 rounded-[3rem] opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhleGFnb25zIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0zMCAwTDYwIDE1TDYwIDQ1TDMwIDYwTDAgNDVMMCAxNVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksMTkyLDI0NiwwLjMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNoZXhhZ29ucykiLz48L3N2Zz4=')] bg-[length:60px_60px]" />
            
            {/* Glossy top highlight */}
            <div className="absolute inset-x-[10%] top-[5%] h-[30%] rounded-[60%] bg-gradient-to-b from-violet-400/10 via-purple-400/5 to-transparent blur-3xl" />
            
            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-[3rem] border-2 border-violet-500/10 shadow-[inset_0_0_60px_rgba(139,92,246,0.1)]" />
            
            {/* Center holographic play zone */}
            <div className="absolute inset-[16%] rounded-[50%] bg-gradient-to-br from-indigo-900/20 via-violet-900/10 to-blue-900/20 border-2 border-violet-500/20 shadow-[inset_0_4px_24px_rgba(0,0,0,0.5),0_0_40px_rgba(139,92,246,0.15)]">
              
              {/* Holographic rings */}
              <div className="absolute inset-6 rounded-[50%] border border-violet-400/10" />
            </div>
            
            {/* Corner accent lights */}
            <div className="absolute top-6 left-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-violet-400/30" />
            </div>
            <div className="absolute top-6 right-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-blue-400/30" />
            </div>
            <div className="absolute bottom-6 left-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-blue-400/30" />
            </div>
            <div className="absolute bottom-6 right-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-violet-400/30" />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { transform: translateY(-100%) rotate(0deg); }
            100% { transform: translateY(100%) rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </div>
  );
}