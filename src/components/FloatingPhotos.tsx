'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Floating Photos Component
 * =========================
 * Creates floating translucent photos that drift across the background.
 * Uses deterministic values to avoid hydration errors.
 */

interface FloatingPhotosProps {
    photos?: string[];
}

const defaultPhotos = [
    '/images/photo-1.jpg',
    '/images/photo-4.jpg',
    '/images/photo-8.jpg',
    '/images/photo-11.jpg',
    '/images/photo-15.jpg',
];

// Deterministic positions to avoid hydration mismatch
const floatingConfigs = [
    { left: 5, top: 15, size: 100, delay: 0, duration: 18, rotation: -10 },
    { left: 25, top: 45, size: 90, delay: 2, duration: 20, rotation: 8 },
    { left: 55, top: 20, size: 110, delay: 4, duration: 16, rotation: -5 },
    { left: 75, top: 60, size: 85, delay: 1, duration: 22, rotation: 12 },
    { left: 85, top: 30, size: 95, delay: 3, duration: 19, rotation: -8 },
];

export default function FloatingPhotos({ photos = defaultPhotos }: FloatingPhotosProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {photos.map((photo, i) => {
                const config = floatingConfigs[i % floatingConfigs.length];
                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-lg overflow-hidden"
                        style={{
                            left: `${config.left}%`,
                            top: `${config.top}%`,
                            width: config.size,
                            height: config.size * 1.2,
                            rotate: config.rotation,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0.08, 0.15, 0.08],
                            y: [0, -30, 0],
                            x: [0, 15, 0],
                            rotate: [config.rotation, config.rotation + 5, config.rotation],
                        }}
                        transition={{
                            duration: config.duration,
                            delay: config.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={photo}
                                alt=""
                                fill
                                className="object-cover rounded-lg"
                                sizes="150px"
                            />
                            {/* Gradient overlay for translucent effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 to-rose-glow/20 rounded-lg" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
