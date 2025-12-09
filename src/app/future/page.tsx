'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { GraduationCap, Stethoscope, Heart, Moon, Coffee, Home, IceCream, MessageCircle, Sparkles } from 'lucide-react';

/**
 * Future Dreams Page - Neon Romantic Redesign
 * ============================================
 * Our future together with glassmorphism and neon effects.
 */

// Career Dreams
const careerDreams = [
    {
        title: 'Aapka Dream - Best Doctor 💉',
        description: 'NEET UG crack karke best doctor banna... I know aap kar logi. Aur main hamesha aapke saath rahunga, har step pe support karunga.',
        icon: Stethoscope,
        timeline: 'Your journey starts now',
        neonColor: '#ff2d92'
    },
    {
        title: 'Mera Dream - IAS Officer 🎯',
        description: 'UPSC CSE crack karke IAS officer banna hai. Aur main promise karta hoon ki success ke baad bhi meri priority aap hi rahogi.',
        icon: GraduationCap,
        timeline: 'Together we\'ll achieve',
        neonColor: '#00f5ff'
    },
    {
        title: 'Hamesha Saath 💕',
        description: 'I will never choose anyone over you. In every life, in every form, I will choose you. Bas aap hi, forever.',
        icon: Heart,
        timeline: 'Every lifetime',
        neonColor: '#bf5af2'
    },
];

// Little Moments
const littleMoments = [
    { icon: IceCream, moment: 'Ice-cream dates 🍦', description: 'Bas aapke saath thandi ice-cream aur garam baatein', neonColor: '#ff6b9d' },
    { icon: Moon, moment: 'Balcony talks under the moon 🌙', description: 'Late night, balcony mein baith k, chaand dekh k baatein karna', neonColor: '#00f5ff' },
    { icon: Coffee, moment: 'Ek saath khana khana 🍽️', description: 'Saath mein table pe baith k, har meal ek celebration bana denge', neonColor: '#ffd700' },
    { icon: MessageCircle, moment: 'Har moment saath create karna ✨', description: 'Choti choti khushiyan, saath mein jeena har pal', neonColor: '#bf5af2' },
    { icon: Home, moment: 'Apna home, apni duniya 🏡', description: 'Jahan sirf hum ho, pyaar ho, aur sukoon ho', neonColor: '#ff2d92' },
];

// Honeymoon Dream
const honeymoonDream = {
    place: 'Aurora Village - Honeymoon ✨',
    description: 'Saath mein Aurora Village jana... us sky ke neeche, us lights ko dekhte hue, ek blanket mein wrapped hokar, sara raat us moment ko jeena. Heaven on earth, with you.',
    emoji: '🌌'
};

// Forever Promise
const foreverPromise = {
    hindi: 'Main hamesha aapke saath rahunga. Main chahta hoon ki meri zindagi utni hi ho jitni aapki hai. Aap hi meri duniya ho, aap hi mera everything.',
    english: 'I want my life to be as long as yours - no more, no less. Forever and ever with you.'
};

export default function FuturePage() {
    return (
        <PageTransition>
            <div className="min-h-screen relative overflow-hidden py-24 px-4">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Aurora effect */}
                <div className="absolute inset-0 aurora-bg opacity-40" />

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[12, 28, 45, 62, 78, 92].map((left, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${left}%`, bottom: '-50px' }}
                            animate={{
                                y: [0, -1500],
                                opacity: [0.2, 0.5, 0],
                                rotate: [0, 180],
                            }}
                            transition={{
                                duration: 14 + i * 2,
                                delay: i * 1.5,
                                repeat: Infinity,
                            }}
                        >
                            <Heart
                                className="w-4 h-4"
                                fill="currentColor"
                                style={{
                                    color: i % 3 === 0 ? '#ff2d92' : i % 3 === 1 ? '#00f5ff' : '#bf5af2',
                                    filter: `drop-shadow(0 0 8px ${i % 3 === 0 ? '#ff2d92' : i % 3 === 1 ? '#00f5ff' : '#bf5af2'})`
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
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart
                                className="w-12 h-12 mx-auto mb-4"
                                fill="currentColor"
                                style={{
                                    color: '#ff2d92',
                                    filter: 'drop-shadow(0 0 20px #ff2d92) drop-shadow(0 0 40px #ff2d92)'
                                }}
                            />
                        </motion.div>
                        <h1 className="font-display text-4xl md:text-5xl mb-4 neon-text-pink neon-flicker">
                            Hamara Future, Saath Mein
                        </h1>
                        <p className="text-cream/60 font-handwritten text-xl max-w-2xl mx-auto">
                            Aapke dreams, mere dreams, aur humara forever promise 💕
                        </p>
                    </motion.div>
                </div>

                {/* Career Dreams */}
                <div className="relative z-10 max-w-5xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl text-center mb-10 neon-text-gold"
                    >
                        <Sparkles className="inline w-6 h-6 mr-2" />
                        Humare Sapne
                        <Sparkles className="inline w-6 h-6 ml-2" />
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {careerDreams.map((dream, index) => {
                            const Icon = dream.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, type: "spring" }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="card-neon p-6 text-center relative overflow-hidden group"
                                >
                                    {/* Neon glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at center, ${dream.neonColor}, transparent 70%)`
                                        }}
                                    />

                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                        style={{
                                            background: `${dream.neonColor}20`,
                                            boxShadow: `0 0 30px ${dream.neonColor}40`,
                                            border: `2px solid ${dream.neonColor}60`
                                        }}
                                    >
                                        <Icon className="w-8 h-8" style={{ color: dream.neonColor }} />
                                    </motion.div>

                                    <h3
                                        className="relative font-display text-xl mb-3"
                                        style={{ color: dream.neonColor, textShadow: `0 0 15px ${dream.neonColor}` }}
                                    >
                                        {dream.title}
                                    </h3>
                                    <p className="relative text-cream/70 text-sm mb-4 font-handwritten leading-relaxed">
                                        {dream.description}
                                    </p>
                                    <span
                                        className="relative text-xs uppercase tracking-wider"
                                        style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}
                                    >
                                        {dream.timeline}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Little Moments */}
                <div className="relative z-10 max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl text-center mb-10 neon-text-cyan"
                    >
                        Chhoti Chhoti Khushiyaan 💫
                    </motion.h2>

                    <div className="space-y-4">
                        {littleMoments.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="glass-premium rounded-2xl p-5 flex items-start gap-4 group"
                                    style={{
                                        borderColor: `${item.neonColor}30`,
                                        boxShadow: `0 0 20px ${item.neonColor}10`
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: `${item.neonColor}20`,
                                            boxShadow: `0 0 15px ${item.neonColor}30`,
                                            border: `1px solid ${item.neonColor}40`
                                        }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: item.neonColor }} />
                                    </motion.div>
                                    <div className="flex-1">
                                        <p
                                            className="font-display text-lg mb-1"
                                            style={{ color: item.neonColor, textShadow: `0 0 10px ${item.neonColor}60` }}
                                        >
                                            {item.moment}
                                        </p>
                                        <p className="text-cream/60 text-sm font-handwritten">{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Honeymoon Dream */}
                <div className="relative z-10 max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="card-neon p-8 text-center relative overflow-hidden"
                    >
                        {/* Aurora background */}
                        <div className="absolute inset-0 aurora-bg opacity-50 rounded-3xl" />

                        <motion.span
                            className="text-6xl block mb-4 relative z-10"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {honeymoonDream.emoji}
                        </motion.span>

                        <h3 className="relative z-10 font-display text-2xl mb-4 neon-text-purple">
                            {honeymoonDream.place}
                        </h3>
                        <p className="relative z-10 text-cream/80 font-handwritten text-lg leading-relaxed">
                            {honeymoonDream.description}
                        </p>
                    </motion.div>
                </div>

                {/* Forever Promise */}
                <motion.div
                    className="relative z-10 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="card-neon p-8">
                        <div className="aurora-bg absolute inset-0 rounded-3xl opacity-20" />

                        <div className="relative z-10">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Heart
                                    className="w-10 h-10 mx-auto mb-6"
                                    fill="currentColor"
                                    style={{
                                        color: '#ff2d92',
                                        filter: 'drop-shadow(0 0 15px #ff2d92)'
                                    }}
                                />
                            </motion.div>

                            <p className="text-cream/90 font-handwritten text-xl mb-4 leading-relaxed">
                                {foreverPromise.hindi}
                            </p>

                            <p className="font-display text-lg italic" style={{ color: '#ff6b9d' }}>
                                &quot;{foreverPromise.english}&quot;
                            </p>

                            <motion.p
                                className="text-sm mt-6"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}
                            >
                                Forever yours, in every life, in every form 💕
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
