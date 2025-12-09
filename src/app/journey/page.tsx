'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import FloatingPhotos from '@/components/FloatingPhotos';
import { timelineData } from '@/data/timelineData';
import {
    Sparkles, Gift, PartyPopper, Heart, Cloud, MapPin,
    Cake, Plane, Calendar, Crown, MessageCircle, Phone, AlertCircle, Camera
} from 'lucide-react';

/**
 * Journey Page - Neon Glassmorphism Redesign
 * ===========================================
 * Vertical timeline with neon effects and glass cards.
 */

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
    Sparkles, Gift, PartyPopper, Heart, Cloud, MapPin,
    Cake, Plane, Calendar, Crown, MessageCircle, Phone, AlertCircle, Camera
};

// Neon colors for timeline dots
const neonColors = ['#ff6b6b', '#ffb347', '#ff8c69', '#ffd700', '#ffa07a'];

interface TimelineItemProps {
    event: typeof timelineData[0];
    index: number;
    isLeft: boolean;
}

function TimelineItem({ event, index, isLeft }: TimelineItemProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = iconMap[event.icon || 'Heart'] || Heart;
    const neonColor = neonColors[index % neonColors.length];

    return (
        <motion.div
            ref={ref}
            className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:gap-12`}
            initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
        >
            {/* Content Card */}
            <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                <motion.div
                    className="card-neon p-6 inline-block max-w-md"
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        boxShadow: `0 0 30px ${neonColor}20`
                    }}
                >
                    <motion.p
                        className="text-sm font-medium mb-2"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}
                    >
                        {event.date}
                    </motion.p>
                    <motion.h3
                        className="text-xl font-display mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        style={{ color: neonColor, textShadow: `0 0 15px ${neonColor}` }}
                    >
                        {event.title}
                    </motion.h3>
                    <motion.p
                        className="text-cream/70 text-sm leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        {event.description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Timeline Dot with neon glow */}
            <motion.div
                className="relative z-10 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            >
                <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    animate={{
                        boxShadow: [
                            `0 0 20px ${neonColor}`,
                            `0 0 40px ${neonColor}`,
                            `0 0 20px ${neonColor}`
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        background: `${neonColor}20`,
                        border: `2px solid ${neonColor}`,
                    }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Icon className="w-5 h-5" style={{ color: neonColor }} />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Spacer */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
}

export default function JourneyPage() {
    return (
        <PageTransition>
            <div className="min-h-screen relative overflow-hidden py-24 px-4">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Floating Photos */}
                <FloatingPhotos photos={[
                    '/images/photo-6.jpg',
                    '/images/photo-7.jpg',
                    '/images/photo-18.jpg',
                    '/images/photo-23.jpg',
                ]} />

                {/* Floating Sparkles with neon colors */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((left, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${left}%`, top: '100%' }}
                            animate={{
                                y: [0, -1500],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                delay: i * 0.5,
                                repeat: Infinity,
                            }}
                        >
                            <Sparkles
                                className="w-4 h-4"
                                style={{
                                    color: neonColors[i % neonColors.length],
                                    filter: `drop-shadow(0 0 8px ${neonColors[i % neonColors.length]})`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Header */}
                <div className="relative z-10 text-center mb-16 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Plane
                                className="w-10 h-10 mx-auto mb-4"
                                style={{
                                    color: '#ffd700',
                                    filter: 'drop-shadow(0 0 15px #ffd700)'
                                }}
                            />
                        </motion.div>
                        <h1 className="font-display text-4xl md:text-5xl mb-4 neon-text-pink neon-flicker">
                            Our Journey
                        </h1>
                        <p className="text-cream/60 max-w-lg mx-auto">
                            Every mile between us is a testament to our love. Here&apos;s our story,
                            one milestone at a time.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: 'linear-gradient(180deg, transparent 0%, #ff6b6b 10%, #ffb347 50%, #ff8c69 90%, transparent 100%)',
                                boxShadow: '0 0 10px #ff6b6b'
                            }}
                        />
                    </motion.div>

                    {/* Mobile Timeline Line */}
                    <div
                        className="absolute left-6 top-0 bottom-0 w-px md:hidden"
                        style={{
                            background: 'linear-gradient(180deg, transparent, #ff6b6b, #ffb347, transparent)',
                            boxShadow: '0 0 10px #ff6b6b'
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-16">
                        {timelineData.map((event, index) => (
                            <div key={index} className="md:hidden">
                                <TimelineItem
                                    event={event}
                                    index={index}
                                    isLeft={false}
                                />
                            </div>
                        ))}

                        <div className="hidden md:block space-y-16">
                            {timelineData.map((event, index) => (
                                <TimelineItem
                                    key={index}
                                    event={event}
                                    index={index}
                                    isLeft={index % 2 === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* End Marker */}
                    <motion.div
                        className="flex justify-center mt-16"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="card-neon rounded-full p-4"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            style={{
                                boxShadow: '0 0 30px #ff6b6b'
                            }}
                        >
                            <Heart
                                className="w-8 h-8"
                                fill="currentColor"
                                style={{
                                    color: '#ff6b6b',
                                    filter: 'drop-shadow(0 0 10px #ff6b6b)'
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.p
                        className="text-center text-cream/50 mt-8 font-display italic text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        ...and the journey continues 💕
                    </motion.p>
                </div>
            </div>
        </PageTransition>
    );
}
