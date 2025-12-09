'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnniversaryPopup from '@/components/AnniversaryPopup';
import { Sparkles, Heart } from 'lucide-react';

/**
 * Home Page Component
 * ===================
 * Hero page with countdown to December 10, 2025 00:00:00 IST.
 * Shows anniversary popup when countdown reaches zero.
 */

// Anniversary target date: December 10, 2025 00:00:00 IST
const ANNIVERSARY_DATE = new Date('2025-12-10T00:00:00+05:30');

interface TimeUnit {
    value: number;
    label: string;
}

// Deterministic heart configs to avoid hydration mismatch
const heartConfigs = [
    { left: 5, delay: 0, duration: 12, size: 16, opacity: 0.15 },
    { left: 12, delay: 1.5, duration: 14, size: 20, opacity: 0.2 },
    { left: 20, delay: 0.5, duration: 16, size: 14, opacity: 0.12 },
    { left: 28, delay: 2, duration: 13, size: 18, opacity: 0.18 },
    { left: 35, delay: 3, duration: 15, size: 22, opacity: 0.15 },
    { left: 45, delay: 1, duration: 11, size: 16, opacity: 0.2 },
    { left: 55, delay: 2.5, duration: 17, size: 14, opacity: 0.12 },
    { left: 62, delay: 0.8, duration: 14, size: 20, opacity: 0.18 },
    { left: 70, delay: 3.5, duration: 12, size: 18, opacity: 0.15 },
    { left: 78, delay: 1.2, duration: 16, size: 16, opacity: 0.2 },
    { left: 85, delay: 2.2, duration: 13, size: 22, opacity: 0.12 },
    { left: 92, delay: 0.3, duration: 15, size: 14, opacity: 0.18 },
];

// Floating hearts component
function FloatingHearts() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {heartConfigs.map((heart, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-50px',
                    }}
                    animate={{
                        y: [0, -1200],
                        x: [0, Math.sin(i) * 50, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Heart
                        size={heart.size}
                        className="text-neon-pink"
                        style={{ opacity: heart.opacity }}
                        fill="currentColor"
                    />
                </motion.div>
            ))}
        </div>
    );
}

// Deterministic sparkle configs
const sparkleConfigs = [
    { left: 8, top: 15, delay: 0, duration: 3, size: 6 },
    { left: 15, top: 45, delay: 1.2, duration: 4, size: 8 },
    { left: 25, top: 25, delay: 0.5, duration: 3.5, size: 5 },
    { left: 35, top: 70, delay: 2, duration: 4.5, size: 7 },
    { left: 42, top: 35, delay: 0.8, duration: 3, size: 6 },
    { left: 55, top: 55, delay: 1.5, duration: 4, size: 8 },
    { left: 65, top: 20, delay: 2.5, duration: 3.5, size: 5 },
    { left: 72, top: 80, delay: 0.3, duration: 4.5, size: 7 },
    { left: 80, top: 40, delay: 1.8, duration: 3, size: 6 },
    { left: 88, top: 60, delay: 2.2, duration: 4, size: 8 },
    { left: 95, top: 10, delay: 0.7, duration: 3.5, size: 5 },
];

// Sparkle particles component
function SparkleParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sparkleConfigs.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: particle.size,
                        height: particle.size,
                        background: i % 2 === 0 ? '#ff6b6b' : '#ffb347',
                        boxShadow: i % 2 === 0
                            ? '0 0 10px #ff6b6b, 0 0 20px #ff6b6b'
                            : '0 0 10px #ffb347, 0 0 20px #ffb347',
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export default function HomePage() {
    const [countdown, setCountdown] = useState<TimeUnit[]>([]);
    const [mounted, setMounted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isAnniversary, setIsAnniversary] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateCountdown = () => {
            const now = new Date();
            const diff = ANNIVERSARY_DATE.getTime() - now.getTime();

            // If countdown is complete, show popup (only if not previously dismissed)
            if (diff <= 0) {
                setIsAnniversary(true);
                // Check if popup was previously dismissed
                const wasDismissed = localStorage.getItem('anniversaryPopupDismissed') === 'true';
                if (!wasDismissed) {
                    setShowPopup(true);
                }
                setCountdown([
                    { value: 0, label: 'Days' },
                    { value: 0, label: 'Hours' },
                    { value: 0, label: 'Minutes' },
                    { value: 0, label: 'Seconds' },
                ]);
                return;
            }

            const seconds = Math.floor((diff / 1000) % 60);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            setCountdown([
                { value: days, label: days === 1 ? 'Day' : 'Days' },
                { value: hours, label: hours === 1 ? 'Hour' : 'Hours' },
                { value: minutes, label: minutes === 1 ? 'Minute' : 'Minutes' },
                { value: seconds, label: seconds === 1 ? 'Second' : 'Seconds' },
            ]);
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Floating Hearts Animation */}
                <FloatingHearts />

                {/* Sparkle Particles */}
                <SparkleParticles />

                {/* Hero Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {/* Sparkle Icon with bounce */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles
                                className="w-12 h-12 mx-auto"
                                style={{
                                    color: '#ffd700',
                                    filter: 'drop-shadow(0 0 10px #ffd700)'
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Main Heading with neon effect */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-4"
                    >
                        <motion.span
                            className="neon-text-pink neon-flicker"
                        >
                            {isAnniversary ? 'Happy 1st Anniversary!' : 'Countdown to Us'}
                        </motion.span>
                    </motion.h1>

                    {/* Animated Heart */}
                    <motion.div
                        className="mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >
                        <Heart
                            className="w-8 h-8 mx-auto text-neon-pink"
                            fill="currentColor"
                            style={{ filter: 'drop-shadow(0 0 10px #ff6b6b)' }}
                        />
                    </motion.div>

                    {/* Date */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="font-display italic text-xl md:text-2xl mb-12 neon-text-gold"
                    >
                        December 10, 2025
                    </motion.p>

                    {/* Decorative Line with neon glow */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative mx-auto mb-12"
                    >
                        <motion.div
                            className="w-32 h-px mx-auto"
                            style={{
                                background: 'linear-gradient(90deg, transparent, #ff6b6b, transparent)',
                                boxShadow: '0 0 20px #ff6b6b'
                            }}
                        />
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className="text-cream/60 text-sm uppercase tracking-widest mb-6">
                            {isAnniversary ? '🎉 The Day is Here! 🎉' : 'Time Until Our Anniversary'}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {countdown.map((unit, index) => (
                                <motion.div
                                    key={unit.label}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="card-neon p-4 md:p-6 cursor-default"
                                >
                                    <motion.span
                                        key={unit.value}
                                        initial={{ scale: 1.3, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="block text-4xl md:text-5xl font-bold mb-1 countdown-digit neon-text-pink"
                                    >
                                        {String(unit.value).padStart(2, '0')}
                                    </motion.span>
                                    <span className="text-cream/50 text-xs md:text-sm uppercase tracking-wider">
                                        {unit.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scroll indicator with bounce */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-16"
                    >
                        <motion.p
                            className="text-cream/30 text-sm"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Navigate using the menu above ✨
                        </motion.p>
                    </motion.div>
                </div>

                {/* Anniversary Popup */}
                <AnniversaryPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                />
            </div>
        </PageTransition>
    );
}
