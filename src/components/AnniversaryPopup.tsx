'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

/**
 * Anniversary Popup Component
 * ============================
 * Full-screen celebration modal with fire burst animation.
 * Triggers when countdown reaches zero on Dec 10, 2025.
 * Uses deterministic values to avoid hydration mismatches.
 */

// Custom anniversary message
const anniversaryMessage = {
    title: "Happy Anniversary, Meri Jaan! 💕",
    greeting: "Meri Jaan,",
    content: [
        `Ghadi mein theek 12 baj chuke hain. Duniya ke liye sirf tarikh badli hai, December 10 shuru hua hai. Lekin mere liye? Mere liye ye wo pal hai jahan main ruk kar us ek insaan ko celebrate karna chahta hoon jo meri duniya ka center hai — yepp it is you my love — Aap.`,

        `Happy Anniversary, my love.`,

        `Isse pehle ki aap is site ke andar jao, isse pehle ki aap wo photos, wo memories, aur wo saare section explore karo — dekho jo maine pichle kuch dinon mein likha hai, main chahta hoon ki aap kuch samjho.`,

        `Maine ye website kyun banayi? Phool bhej nahi skta due to aap abhi ghr pe ho and letter bhi possible nahi hai but jab hum milenge I will make sure ki hum aapko hand written letter de on papers. Gifts wagera toh I have given though wo gifts nahi hai ik aap aapke exam k baad wo dustbin mein honge and raha baat wo tab pe dene ka — it is not possible to match the design level or choose the template for u and wo de saku aapko like you are pro in it but not me — and I am just doing what I am good at.`,

        `And also yeah site aapke pass hai jab tak internet rahega, jab tak servers challenge, hamara ye chhota sa corner hamesha zinda rahega. Ye meri koshish hai humari dooriyon ko mitaane ki. Yeah 770 km dur ki duriya shayad yeah screen hum dono ko thoda better feel karaye.`,

        `Lekin sach kahoon?`,

        `This site is just a drop. My love is the ocean. Ye site sirf ek boond hai, aur mera pyaar ek samandar.`,

        `Aap is site par kya dekhogi? Kuch photos? Kuch pyaari baatein? Kuch memories? Haan, wo sab hain. Lekin is screen par wo kaise likhun jo main feel karta hoon jab aap thaki hui hoti ho? Main wo 'variable' kaise define karoon jo meri heartbeat ka rate badha deta hai jab aapka text aata hai? Main wo 'loop' kaise code karoon jo mere dimaag mein chalta rehta hai — subah uthne se lekar raat ko sone tak — sirf aapka khayal? Ik kaafi coding wala baat ho gaya hai bubu 😅`,

        `Ye website meri feelings ka 1% bhi nahi hai. Ye bas ek "glimpse" hai. Ek jhalak.`,

        `Jitni mehnat aap apne future ke liye, hamare future ke liye kar rahi ho, us dedication ke saamne ye website kuch bhi nahi hai. Aap door ho, hum long-distance mein hain, hum roz mil nahi sakte, hum roz haath pakad kar walk par nahi ja sakte. Isliye maine ye banaya. Taaki jab bhi aapko lage ki main door hoon, aap is link ko kholo aur mehsoos karo ki main wahin hoon. Aapke phone ki screen ke us paar, har pixel mein, har line of code mein, meri dhadkan hai. Ik I have made other website too but yeah anniversary site might be something special for you 💕`,

        `Is site ke andar jo kuch bhi hai, wo meri taraf se ek waada hai. My promises for you to be with you and many other stuff bubu — I hope you like this website...`,

        `Toh meri jaan, Jaise hi aap upar diye gaye button par click karogi, aap meri banayi hui is choti si duniya mein enter karogi. Par yaad rakhna, ye sirf shuruaat hai. Asli pyaar is screen par nahi, meri aankhon mein hai, jo sirf aur sirf aapko dhoondti hain. But yeah duriyan uff okay chalo aage chalte hai site mein 💕`,
    ],
    closing: "I love you more than anything bubu — u are mine and mine and always mine and I love you shona babu",
    signature: "Happy Anniversary. Aap meri ho. Sirf meri.\n\nHamesha,\nApka Adarsh 💕"
};

// Deterministic fire particle configs
const fireParticleConfigs = Array.from({ length: 40 }, (_, i) => ({
    angle: (i * 360 / 40) * Math.PI / 180,
    distance: 200 + (i * 5),
    color: i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#ffd700' : '#ffa07a',
}));

// Deterministic heart configs
const heartConfigs = Array.from({ length: 20 }, (_, i) => ({
    angle: (i * 360 / 20) * Math.PI / 180,
    distance: 300 + (i * 8),
    size: 16 + (i % 8),
}));

// Deterministic star configs  
const starConfigs = Array.from({ length: 15 }, (_, i) => ({
    angle: ((i * 360 / 15) + 12) * Math.PI / 180,
    size: 12 + (i % 6),
}));

interface AnniversaryPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AnniversaryPopup({ isOpen, onClose }: AnniversaryPopupProps) {
    const [showContent, setShowContent] = useState(false);
    const [fireBurstComplete, setFireBurstComplete] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setFireBurstComplete(true), 1500);
            setTimeout(() => setShowContent(true), 2000);
        } else {
            setShowContent(false);
            setFireBurstComplete(false);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(0, 0, 0, 0.95)' }}
                >
                    {/* Fire Burst Animation */}
                    {!fireBurstComplete && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Central burst */}
                            <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 3, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute w-32 h-32 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, #ff6b6b, #ffa07a, transparent)',
                                }}
                            />

                            {/* Fire particles - deterministic */}
                            {fireParticleConfigs.map((config, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                    animate={{
                                        x: Math.cos(config.angle) * config.distance,
                                        y: Math.sin(config.angle) * config.distance,
                                        scale: 0,
                                        opacity: 0
                                    }}
                                    transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
                                    className="absolute w-3 h-3 rounded-full"
                                    style={{ background: config.color }}
                                />
                            ))}

                            {/* Hearts burst - deterministic */}
                            {heartConfigs.map((config, i) => (
                                <motion.div
                                    key={`heart-${i}`}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                    animate={{
                                        x: Math.cos(config.angle) * config.distance,
                                        y: Math.sin(config.angle) * config.distance,
                                        opacity: 0,
                                        scale: 1,
                                        rotate: 360
                                    }}
                                    transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                                >
                                    <Heart
                                        className="text-neon-pink"
                                        fill="currentColor"
                                        size={config.size}
                                    />
                                </motion.div>
                            ))}

                            {/* Stars burst - deterministic */}
                            {starConfigs.map((config, i) => (
                                <motion.div
                                    key={`star-${i}`}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                    animate={{
                                        x: Math.cos(config.angle) * 350,
                                        y: Math.sin(config.angle) * 350,
                                        opacity: 0,
                                        scale: 1.5,
                                        rotate: 720
                                    }}
                                    transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                                >
                                    <Star
                                        className="text-neon-gold"
                                        fill="currentColor"
                                        size={config.size}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Main Content */}
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className="relative max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'rgba(255, 45, 146, 0.5) transparent'
                                }}
                            >
                                {/* Neon border card */}
                                <div className="card-neon p-8 md:p-12 relative">
                                    {/* Aurora background */}
                                    <div className="absolute inset-0 aurora-bg rounded-3xl opacity-30" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Animated heart */}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="mb-6 text-center"
                                        >
                                            <Heart
                                                className="w-16 h-16 mx-auto text-neon-pink"
                                                fill="currentColor"
                                                style={{ filter: 'drop-shadow(0 0 20px #ff6b6b)' }}
                                            />
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="font-display text-3xl md:text-4xl mb-6 text-center neon-text-pink"
                                        >
                                            {anniversaryMessage.title}
                                        </motion.h1>

                                        {/* Greeting */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-neon-gold font-display text-xl mb-6"
                                        >
                                            {anniversaryMessage.greeting}
                                        </motion.p>

                                        {/* Main content paragraphs */}
                                        <div className="space-y-4 mb-8">
                                            {anniversaryMessage.content.map((paragraph, i) => (
                                                <motion.p
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 + i * 0.1 }}
                                                    className="text-cream/90 font-handwritten text-base md:text-lg leading-relaxed"
                                                >
                                                    {paragraph}
                                                </motion.p>
                                            ))}
                                        </div>

                                        {/* Closing */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2 }}
                                            className="glass-rose rounded-2xl p-6 mb-6"
                                        >
                                            <p className="text-cream font-handwritten text-lg leading-relaxed mb-4">
                                                {anniversaryMessage.closing}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ scale: [1, 1.3, 1] }}
                                                        transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                                                    >
                                                        <Sparkles
                                                            className="w-4 h-4"
                                                            style={{
                                                                color: '#ffd700',
                                                                filter: 'drop-shadow(0 0 6px #ffd700)'
                                                            }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <p
                                                className="font-display text-lg whitespace-pre-line text-center"
                                                style={{ color: '#ffa07a', textShadow: '0 0 10px #ffa07a' }}
                                            >
                                                {anniversaryMessage.signature}
                                            </p>
                                        </motion.div>

                                        {/* Close button */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2.5 }}
                                            className="text-center"
                                        >
                                            <motion.button
                                                onClick={onClose}
                                                className="px-8 py-4 rounded-full text-white font-display text-lg"
                                                style={{
                                                    background: 'linear-gradient(135deg, #ff6b6b, #ff8c69)',
                                                    boxShadow: '0 0 30px rgba(255, 45, 146, 0.5)'
                                                }}
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255, 45, 146, 0.7)' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Enter Our World 💕
                                            </motion.button>
                                            <p className="text-cream/40 text-sm mt-3">
                                                Click to explore the website
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating hearts background - deterministic */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[10, 19, 28, 37, 46, 55, 64, 73, 82, 91].map((left, i) => (
                            <motion.div
                                key={`bg-heart-${i}`}
                                className="absolute"
                                style={{ left: `${left}%`, bottom: '-50px' }}
                                animate={{
                                    y: [0, -1000],
                                    opacity: [0, 0.5, 0],
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 8 + i,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                }}
                            >
                                <Heart
                                    className="text-neon-pink/30"
                                    fill="currentColor"
                                    size={16 + i * 2}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
