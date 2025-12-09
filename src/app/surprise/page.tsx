'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Gift, Heart, Sparkles, Star } from 'lucide-react';

/**
 * Surprise Page - Neon Fire Animation Redesign
 * ==============================================
 * Hidden gift box with fire burst and confetti.
 */

const surpriseMessage = {
    title: "Happy 1st Anniversary, My Love! 💕",
    message: `To my beautiful girlfriend,

One year ago, my life changed forever. From that random anonymous chat on November 30th to this moment - you have been my everything.

I remember lying about being in IIT just to impress you. I remember the nervousness before our first call. I remember asking for a "5 second" video call that lasted a minute. I remember the tears, the jealousy, the midnight consolations.

But most of all, I remember the moment at 2:43 AM on December 10th when you said those three magical words that made my world stop.

This past year has been the most beautiful journey of my life. Every video call, every late night, every "I love you" - I would relive it all in a heartbeat.

Thank you for being my everything. Thank you for choosing me.

Here's to forever. Here's to us.

I love you more than words could ever say.

Forever yours,
Your partner in everything your hubby💕`,
    signature: "With all my heart ❤️"
};

// Confetti component
function Confetti() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(60)].map((_, i) => {
                const colors = ['#ff2d92', '#00f5ff', '#ffd700', '#bf5af2', '#ff6b9d'];
                const color = colors[i % colors.length];
                const startX = 10 + (i * 1.5);
                const endX = startX + (i % 10 - 5) * 4;
                const size = 6 + (i % 6);

                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            width: size,
                            height: size,
                            left: `${startX}%`,
                            top: '-5%',
                            background: color,
                            borderRadius: i % 2 === 0 ? '50%' : '2px',
                            boxShadow: `0 0 10px ${color}`,
                        }}
                        initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
                        animate={{
                            y: [0, 1200],
                            x: [0, (endX - startX) * 10],
                            rotate: [0, 720],
                            opacity: [1, 1, 0],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            delay: i * 0.03,
                            ease: "easeOut",
                        }}
                    />
                );
            })}
        </div>
    );
}

// Fire particles
function FireParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => {
                const angle = (i * 360 / 50) * (Math.PI / 180);
                const dist = 150 + Math.random() * 200;
                const colors = ['#ff2d92', '#ffd700', '#ff6b9d', '#bf5af2'];

                return (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                        style={{
                            background: colors[i % colors.length],
                            boxShadow: `0 0 15px ${colors[i % colors.length]}`,
                        }}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                            x: Math.cos(angle) * dist,
                            y: Math.sin(angle) * dist,
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.1 + (i * 0.02),
                            ease: "easeOut",
                        }}
                    />
                );
            })}
        </div>
    );
}

export default function SurprisePage() {
    const [isOpened, setIsOpened] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showFireParticles, setShowFireParticles] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpened) {
            setShowFireParticles(true);
            setTimeout(() => setShowConfetti(true), 500);
            setTimeout(() => setShowContent(true), 1500);
        }
    }, [isOpened]);

    const handleOpen = () => {
        if (!isOpened) {
            setIsOpened(true);
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen relative overflow-hidden py-24 px-4 flex items-center justify-center">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Aurora */}
                <div className="absolute inset-0 aurora-bg opacity-40" />

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[10, 25, 40, 55, 70, 85].map((left, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${left}%`, bottom: '-50px' }}
                            animate={{
                                y: [0, -1200],
                                opacity: [0.3, 0.5, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                delay: i * 0.8,
                                repeat: Infinity,
                            }}
                        >
                            <Heart
                                className="w-4 h-4"
                                fill="currentColor"
                                style={{
                                    color: i % 2 === 0 ? '#ff2d92' : '#00f5ff',
                                    filter: `drop-shadow(0 0 8px ${i % 2 === 0 ? '#ff2d92' : '#00f5ff'})`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Fire Particles */}
                <AnimatePresence>
                    {showFireParticles && <FireParticles />}
                </AnimatePresence>

                {/* Confetti */}
                <AnimatePresence>
                    {showConfetti && <Confetti />}
                </AnimatePresence>

                {/* Gift Box - Pre-open state */}
                <AnimatePresence>
                    {!isOpened && (
                        <motion.div
                            className="relative z-20 cursor-pointer"
                            onClick={handleOpen}
                            initial={{ scale: 0, rotateY: -90 }}
                            animate={{ scale: 1, rotateY: 0 }}
                            exit={{ scale: 2, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="text-center">
                                {/* Gift box icon with neon glow */}
                                <motion.div
                                    className="relative"
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <motion.div
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center mx-auto"
                                        animate={{
                                            boxShadow: [
                                                '0 0 30px #ff2d92, 0 0 60px rgba(255, 45, 146, 0.5)',
                                                '0 0 50px #ff2d92, 0 0 100px rgba(255, 45, 146, 0.7)',
                                                '0 0 30px #ff2d92, 0 0 60px rgba(255, 45, 146, 0.5)',
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255, 45, 146, 0.2), rgba(191, 90, 242, 0.2))',
                                            border: '2px solid #ff2d92',
                                        }}
                                    >
                                        <Gift
                                            className="w-16 h-16 md:w-20 md:h-20"
                                            style={{
                                                color: '#ff2d92',
                                                filter: 'drop-shadow(0 0 20px #ff2d92)'
                                            }}
                                        />
                                    </motion.div>

                                    {/* Sparkles around gift */}
                                    {[0, 72, 144, 216, 288].map((angle, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute left-1/2 top-1/2"
                                            style={{
                                                transform: `rotate(${angle}deg) translateX(80px)`,
                                            }}
                                            animate={{
                                                scale: [0.5, 1.2, 0.5],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.3,
                                                repeat: Infinity,
                                            }}
                                        >
                                            <Sparkles
                                                className="w-5 h-5"
                                                style={{
                                                    color: '#ffd700',
                                                    filter: 'drop-shadow(0 0 8px #ffd700)'
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.h2
                                    className="font-display text-2xl md:text-3xl mt-8 mb-2 neon-text-pink neon-flicker"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Click to Open Your Gift
                                </motion.h2>
                                <motion.p
                                    className="text-cream/60 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    A special surprise awaits... 💕
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content - Post-open state */}
                <AnimatePresence>
                    {showContent && (
                        <motion.div
                            className="relative z-10 max-w-2xl mx-auto"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.8 }}
                        >
                            <div className="card-neon p-8 md:p-12 relative overflow-hidden">
                                {/* Aurora background */}
                                <div className="absolute inset-0 aurora-bg opacity-30 rounded-3xl" />

                                <div className="relative z-10">
                                    {/* Title */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-center mb-8"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="mb-4"
                                        >
                                            <Heart
                                                className="w-12 h-12 mx-auto"
                                                fill="currentColor"
                                                style={{
                                                    color: '#ff2d92',
                                                    filter: 'drop-shadow(0 0 20px #ff2d92)'
                                                }}
                                            />
                                        </motion.div>
                                        <h1 className="font-display text-3xl md:text-4xl neon-text-pink">
                                            {surpriseMessage.title}
                                        </h1>
                                    </motion.div>

                                    {/* Message */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mb-8"
                                    >
                                        <p className="font-handwritten text-lg leading-relaxed text-cream/90 whitespace-pre-line">
                                            {surpriseMessage.message}
                                        </p>
                                    </motion.div>

                                    {/* Signature */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="text-center"
                                    >
                                        <p
                                            className="font-display italic text-lg"
                                            style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}
                                        >
                                            {surpriseMessage.signature}
                                        </p>

                                        {/* Decorative stars */}
                                        <motion.div
                                            className="flex items-center justify-center gap-3 mt-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        rotate: [0, 180, 360]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: i * 0.2,
                                                        repeat: Infinity
                                                    }}
                                                >
                                                    <Star
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        style={{
                                                            color: '#ffd700',
                                                            filter: 'drop-shadow(0 0 6px #ffd700)'
                                                        }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
}
