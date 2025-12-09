'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import { Heart, Home, Shield, TrendingUp, Users, Infinity as InfinityIcon, MessageCircle, Lock, Flame, Star, Gift, LucideIcon } from 'lucide-react';

/**
 * Promises Page - Neon Romantic Redesign
 * =======================================
 * 10 Sacred Promises with glassmorphism and neon effects.
 */

interface Promise {
    number: number;
    title: string;
    description: string;
    icon: LucideIcon;
    neonColor: string;
}

const promises: Promise[] = [
    {
        number: 1,
        title: 'Ghar Ki and aapki Zimmedari',
        description: 'Main promise karta hoon ki hamare ghar aur humari wellbeing ki poori zimmedari meri hogi. Jaise main ghar chalane ke liye mehnat karunga, waise hi main is baat ka poora khayal rakhunga ki aapki soul ko kabhi pyaar aur attention ki kami mehsoos na ho.',
        icon: Home,
        neonColor: '#ff6b6b'
    },
    {
        number: 2,
        title: 'Your Supporter',
        description: 'Main vaada karta hoon ki main hamesha aapki aur hamari family ki dhaal (shield) bankar rahunga. Jab aap kamzor mehsoos karengi, main aapki taaqat banoonga. Main aapki physical aur mental health ka utna hi sakhti se khayal rakhunga jitna main apna rakhta hoon.',
        icon: Shield,
        neonColor: '#ffb347'
    },
    {
        number: 3,
        title: 'Saath Mein we will see everything',
        description: 'Main promise karta hoon ki hum saath milkar apni life mein aage badhenge—sirf paison mein nahi, balki values aur khushiyon mein bhi. Humara future hum saath banayenge, aur meri har jeet aur success par sirf mera nahi, "humara" haq hoga.',
        icon: TrendingUp,
        neonColor: '#ff8c69'
    },
    {
        number: 4,
        title: 'Aapki Khushi Meri Priority',
        description: 'Main vaada karta hoon ki meri priority hamesha aapki khushi hogi. Hamare ghar mein aapki awaaz aur aapki rai (opinion) hamesha mayne rakhegi. Rishte mein shanti tabhi hoti hai jab izzat ho, aur main hamesha aapki respect karunga.',
        icon: Heart,
        neonColor: '#ffa07a'
    },
    {
        number: 5,
        title: 'Family Ka Pyaar',
        description: 'Main promise karta hoon ki main hamare bacchon aur hamare parents—dono taraf ke—ko poore dil se apnaunga. Main unhe wahi pyaar aur respect dunga jo aap chahti hain, taaki hamare bacche mujhe dekh kar seekhein ki aapki izzat kaise karni hai.',
        icon: Users,
        neonColor: '#ffd700'
    },
    {
        number: 6,
        title: 'Har Mausam Mein Saath',
        description: 'Main vaada karta hoon ki life ke har mausam mein—chahe gussa ho ya dukh—main aapka haath kabhi nahi chhodunga. Chahe waqt accha ho ya bura, hum ameer hon ya struggle kar rahe hon, aap kabhi bhi kisi toofan ka saamna akele nahi karogi.',
        icon: InfinityIcon,
        neonColor: '#ffb347'
    },
    {
        number: 7,
        title: 'To be better fit for u',
        description: 'Pati banne se pehle, main aapse vaada karta hoon ki main aapka sabse saccha dost banunga. Hamare rishte mein koi bada ya chhota nahi hoga, hum hamesha barabari se, kandhe se kandha milakar chalenge.',
        icon: MessageCircle,
        neonColor: '#ff6b6b'
    },
    {
        number: 8,
        title: 'Way we solve our fight',
        description: 'Main promise karta hoon ki hamare beech ke jhagde aur arguments sirf hamare beech rahenge. Chahe kitni bhi badi baat ho jaye, main kisi teesre insan ko kabhi hamare beech nahi launga. Hum apni problems khud solve karenge.',
        icon: Lock,
        neonColor: '#ff8c69'
    },
    {
        number: 9,
        title: 'Passion Never Dies',
        description: 'Main vaada karta hoon ki waqt ya umr ke saath hamare beech ka passion kam nahi hone dunga. Humare beech ka physical affection, romance hamesha meri priority rahegi. Hum hamesha lovers rahenge.',
        icon: Flame,
        neonColor: '#ffa07a'
    },
    {
        number: 10,
        title: 'Your dreams bubu',
        description: 'Main vaada karta hoon ki shaadi ke baad aapki apni pehchaan kabhi khone nahi dunga. Main aapke sapno (jaise aapka world ka best doctor banna, AIIMS ki director banna) ka sabse bada supporter banunga.',
        icon: Star,
        neonColor: '#ffd700'
    },
];

export default function PromisesPage() {
    const [showGateway, setShowGateway] = useState(false);
    const router = useRouter();

    return (
        <PageTransition>
            <div className="min-h-screen relative overflow-hidden py-24 px-4">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Aurora effect */}
                <div className="absolute inset-0 aurora-bg opacity-30" />

                {/* Floating Hearts with Neon */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[8, 22, 38, 54, 68, 82, 95].map((left, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${left}%`, bottom: '-50px' }}
                            animate={{
                                y: [0, -1500],
                                opacity: [0.2, 0.5, 0],
                                rotate: [0, 360],
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
                                    color: i % 2 === 0 ? '#ff6b6b' : '#ffb347',
                                    filter: `drop-shadow(0 0 10px ${i % 2 === 0 ? '#ff6b6b' : '#ffb347'})`
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
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart
                                className="w-12 h-12 mx-auto mb-4"
                                fill="currentColor"
                                style={{
                                    color: '#ff6b6b',
                                    filter: 'drop-shadow(0 0 20px #ff6b6b) drop-shadow(0 0 40px #ff6b6b)'
                                }}
                            />
                        </motion.div>
                        <h1 className="font-display text-4xl md:text-5xl mb-4 neon-text-pink neon-flicker">
                            Hamare 10 Sacred Promises
                        </h1>
                        <p className="text-cream/60 max-w-2xl mx-auto font-handwritten text-lg">
                            Marriage vows jo maine aapko diye hain.
                            Hamare forever ke liye. 💍
                        </p>
                    </motion.div>
                </div>

                {/* Promises Grid */}
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {promises.map((promise, index) => {
                            const Icon = promise.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="card-neon p-6 relative overflow-hidden group"
                                >
                                    {/* Neon glow on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at center, ${promise.neonColor}, transparent 70%)`
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4 mb-4">
                                            {/* Icon with neon glow */}
                                            <motion.div
                                                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                                                style={{
                                                    background: `${promise.neonColor}20`,
                                                    boxShadow: `0 0 20px ${promise.neonColor}40, inset 0 0 20px ${promise.neonColor}20`,
                                                    border: `2px solid ${promise.neonColor}60`
                                                }}
                                                whileHover={{ rotate: 360, scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Icon
                                                    className="w-6 h-6"
                                                    style={{ color: promise.neonColor }}
                                                />
                                            </motion.div>

                                            <div className="flex-1">
                                                <span
                                                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                                                    style={{
                                                        background: `${promise.neonColor}20`,
                                                        color: promise.neonColor,
                                                        border: `1px solid ${promise.neonColor}40`
                                                    }}
                                                >
                                                    Promise #{promise.number}
                                                </span>
                                                <h3
                                                    className="text-xl font-display"
                                                    style={{
                                                        color: promise.neonColor,
                                                        textShadow: `0 0 10px ${promise.neonColor}60`
                                                    }}
                                                >
                                                    {promise.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-cream/80 font-handwritten text-base leading-relaxed">
                                            {promise.description}
                                        </p>

                                        {/* Decorative corner heart */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 opacity-20"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                        >
                                            <Heart
                                                className="w-6 h-6"
                                                fill="currentColor"
                                                style={{ color: promise.neonColor }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Signature */}
                <motion.div
                    className="relative z-10 text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="card-neon p-8 max-w-xl mx-auto">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Heart
                                className="w-10 h-10 mx-auto mb-4"
                                fill="currentColor"
                                style={{
                                    color: '#ff6b6b',
                                    filter: 'drop-shadow(0 0 15px #ff6b6b)'
                                }}
                            />
                        </motion.div>
                        <p className="text-cream font-handwritten text-xl mb-4 leading-relaxed">
                            &quot;In hamare 10 promises se, main aapko apna dil, apni jaan, aur apni zindagi de raha hoon.&quot;
                        </p>
                        <p className="text-sm" style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}>
                            Forever and always yours 💕
                        </p>
                    </div>
                </motion.div>

                {/* Surprise Button */}
                <motion.div
                    className="relative z-10 text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        onClick={() => setShowGateway(true)}
                        className="group relative px-8 py-4 rounded-full font-display text-lg overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #ff6b6b, #ff8c69)',
                            boxShadow: '0 0 30px rgba(255, 45, 146, 0.5)'
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255, 45, 146, 0.7)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: [-200, 200] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        <span className="relative flex items-center gap-2 justify-center text-white">
                            <Gift className="w-5 h-5" />
                            <span>Ek aur surprise hai... 🎁</span>
                        </span>
                    </motion.button>

                    <p className="text-cream/40 text-xs mt-3 font-handwritten">
                        Yahan click karo 💕
                    </p>
                </motion.div>

                {/* Gateway Modal */}
                <AnimatePresence>
                    {showGateway && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                        >
                            {/* Floating hearts */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {[15, 35, 55, 75, 90].map((left, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{ left: `${left}%`, bottom: '-50px' }}
                                        animate={{
                                            y: [0, -800],
                                            opacity: [0, 0.6, 0],
                                            rotate: [0, 180],
                                        }}
                                        transition={{
                                            duration: 6,
                                            delay: i * 0.3,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <Heart
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            style={{
                                                color: '#ff6b6b',
                                                filter: 'drop-shadow(0 0 10px #ff6b6b)'
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Modal content */}
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                className="card-neon p-8 md:p-12 max-w-lg text-center relative"
                            >
                                <div className="aurora-bg absolute inset-0 rounded-3xl opacity-20" />

                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="mb-6"
                                    >
                                        <Heart
                                            className="w-16 h-16 mx-auto"
                                            fill="currentColor"
                                            style={{
                                                color: '#ff6b6b',
                                                filter: 'drop-shadow(0 0 20px #ff6b6b)'
                                            }}
                                        />
                                    </motion.div>

                                    <h2 className="font-display text-3xl mb-4 neon-text-pink">
                                        Ready for your surprise? 🎁
                                    </h2>

                                    <p className="text-cream/80 font-handwritten text-lg mb-8 leading-relaxed">
                                        Maine aapke liye kuch special banaya hai...
                                        Ek chhota sa gift jo sirf aapke liye hai 💕
                                    </p>

                                    <div className="flex gap-4 justify-center">
                                        <motion.button
                                            onClick={() => setShowGateway(false)}
                                            className="px-6 py-3 rounded-full glass-premium text-cream hover:bg-cream/10 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Abhi nahi
                                        </motion.button>

                                        <motion.button
                                            onClick={() => router.push('/surprise')}
                                            className="px-8 py-3 rounded-full text-white font-display"
                                            style={{
                                                background: 'linear-gradient(135deg, #ff6b6b, #ff8c69)',
                                                boxShadow: '0 0 20px rgba(255, 45, 146, 0.5)'
                                            }}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 45, 146, 0.7)' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Haan, dikhao! 💕
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
}
