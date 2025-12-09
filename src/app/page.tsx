'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

/**
 * Enter Page Component - Neon Redesign
 * =====================================
 * Cinematic entry with neon heart animation.
 * Required for browser autoplay policies.
 */
export default function EnterPage() {
  const router = useRouter();
  const { startAudio } = useAudio();

  const handleEnter = () => {
    startAudio();
    router.push('/home');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={handleEnter}
    >
      {/* Background */}
      <div className="absolute inset-0 page-bg" />

      {/* Aurora effect */}
      <div className="absolute inset-0 aurora-bg opacity-30" />

      {/* Floating particles with neon colors */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { x: 100, y: 50, duration: 8, delay: 0, color: '#ff6b6b' },
          { x: 300, y: 150, duration: 12, delay: 1, color: '#ffb347' },
          { x: 500, y: 80, duration: 10, delay: 0.5, color: '#ff8c69' },
          { x: 700, y: 200, duration: 14, delay: 2, color: '#ff6b6b' },
          { x: 200, y: 300, duration: 9, delay: 1.5, color: '#ffd700' },
          { x: 400, y: 250, duration: 11, delay: 0.8, color: '#ffb347' },
          { x: 600, y: 100, duration: 13, delay: 2.5, color: '#ffa07a' },
          { x: 800, y: 180, duration: 8, delay: 1.2, color: '#ff8c69' },
          { x: 150, y: 350, duration: 10, delay: 3, color: '#ff6b6b' },
          { x: 350, y: 400, duration: 12, delay: 0.3, color: '#ffb347' },
          { x: 550, y: 320, duration: 9, delay: 1.8, color: '#ffd700' },
          { x: 750, y: 380, duration: 11, delay: 2.2, color: '#ff6b6b' },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              background: particle.color,
              boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Connection Line Animation */}
      <motion.div
        className="absolute w-full max-w-md px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg viewBox="0 0 300 20" className="w-full">
          <motion.path
            d="M 10 10 Q 75 0, 150 10 Q 225 20, 290 10"
            fill="none"
            stroke="url(#neonLineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 0 5px #ff6b6b)' }}
          />
          <defs>
            <linearGradient id="neonLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ffb347" />
              <stop offset="100%" stopColor="#ff6b6b" />
            </linearGradient>
          </defs>
          {/* Start point */}
          <motion.circle
            cx="10"
            cy="10"
            r="4"
            fill="#ff6b6b"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 8px #ff6b6b)' }}
          />
          {/* End point */}
          <motion.circle
            cx="290"
            cy="10"
            r="4"
            fill="#ffb347"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            style={{ filter: 'drop-shadow(0 0 8px #ffb347)' }}
          />
        </svg>
      </motion.div>

      {/* Beating Heart with Neon Glow */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="heartbeat relative">
          <Heart
            className="w-24 h-24 md:w-32 md:h-32"
            fill="currentColor"
            style={{
              color: '#ff6b6b',
              filter: 'drop-shadow(0 0 30px #ff6b6b) drop-shadow(0 0 60px #ff6b6b)'
            }}
          />
          {/* Neon ring effect */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full"
            animate={{
              boxShadow: [
                "0 0 40px rgba(255, 45, 146, 0.3)",
                "0 0 80px rgba(255, 45, 146, 0.6)",
                "0 0 40px rgba(255, 45, 146, 0.3)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Click to Enter Text */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.p
          className="text-lg md:text-xl mb-4 font-light tracking-widest neon-text-pink"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click anywhere to enter
        </motion.p>
        <p className="text-cream/40 text-sm">
          🎵 Best experienced with sound on
        </p>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
    </div>
  );
}
