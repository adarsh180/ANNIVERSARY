'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

/**
 * Audio Player Component - Neon Glassmorphism Redesign
 * ======================================================
 * Floating music player with neon waveform animation.
 */
export default function AudioPlayer() {
    const { isPlaying, isMuted, hasStarted, togglePlay, toggleMute } = useAudio();

    if (!hasStarted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <div
                className="rounded-full px-4 py-3 flex items-center gap-3"
                style={{
                    background: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 45, 146, 0.3)',
                    boxShadow: '0 0 30px rgba(255, 45, 146, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
            >
                {/* Waveform Animation with neon colors */}
                <div className="flex items-center gap-0.5 h-5">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 rounded-full"
                            animate={{
                                height: isPlaying && !isMuted ? [8, 16, 8, 20, 8] : [4, 4, 4, 4, 4],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "linear"
                            }}
                            style={{
                                minHeight: 4,
                                background: i % 2 === 0 ? '#ff6b6b' : '#ffb347',
                                boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff6b6b' : '#ffb347'}`
                            }}
                        />
                    ))}
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="p-2 rounded-full transition-all duration-300"
                    style={{
                        background: 'rgba(255, 45, 146, 0.2)',
                        border: '1px solid rgba(255, 45, 146, 0.4)',
                    }}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Pause
                                    className="w-4 h-4"
                                    style={{ color: '#ff6b6b', filter: 'drop-shadow(0 0 4px #ff6b6b)' }}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Play
                                    className="w-4 h-4"
                                    style={{ color: '#ff6b6b', filter: 'drop-shadow(0 0 4px #ff6b6b)' }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* Mute/Unmute Button */}
                <button
                    onClick={toggleMute}
                    className="p-2 rounded-full transition-all duration-300"
                    style={{
                        background: 'rgba(0, 245, 255, 0.15)',
                        border: '1px solid rgba(0, 245, 255, 0.3)',
                    }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    <AnimatePresence mode="wait">
                        {isMuted ? (
                            <motion.div
                                key="muted"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <VolumeX className="w-4 h-4 text-cream/60" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unmuted"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Volume2
                                    className="w-4 h-4"
                                    style={{ color: '#ffb347', filter: 'drop-shadow(0 0 4px #ffb347)' }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.div>
    );
}
