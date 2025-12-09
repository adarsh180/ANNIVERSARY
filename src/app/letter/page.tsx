'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { letterContent } from '@/data/letterContent';
import { ChevronLeft, ChevronRight, Mail, Heart } from 'lucide-react';

/**
 * Letter Page - Neon Glassmorphism Redesign
 * ==========================================
 * Love letter with smooth animations and neon accents.
 */

interface LetterTextProps {
    text: string;
    pageKey: string | number;
}

function LetterText({ text, pageKey }: LetterTextProps) {
    const words = text.split(/(\s+)/).filter(word => word.length > 0);

    return (
        <motion.div
            key={pageKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="font-handwritten text-base md:text-lg lg:text-xl leading-relaxed text-charcoal whitespace-pre-wrap"
        >
            {words.map((word, index) => (
                <motion.span
                    key={`${pageKey}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: index * 0.02,
                        ease: "easeOut"
                    }}
                    className="inline"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

export default function LetterPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const totalPages = letterContent.length;

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setDirection(1);
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(currentPage - 1);
        }
    };

    const pageVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            rotateY: dir > 0 ? -15 : 15,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -300 : 300,
            rotateY: dir > 0 ? 15 : -15,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <PageTransition>
            <div className="min-h-screen relative overflow-hidden py-24 px-4">
                {/* Background */}
                <div className="absolute inset-0 page-bg" />

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[5, 15, 28, 40, 52, 65, 75, 88].map((left, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${left}%`, bottom: '-50px' }}
                            animate={{
                                y: [0, -1200],
                                rotate: [0, 360],
                                opacity: [0.2, 0.4, 0],
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
                                    color: i % 2 === 0 ? '#ff2d92' : '#ff6b9d',
                                    filter: `drop-shadow(0 0 6px ${i % 2 === 0 ? '#ff2d92' : '#ff6b9d'})`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Header */}
                <div className="relative z-10 text-center mb-8 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Mail
                                className="w-10 h-10 mx-auto mb-4"
                                style={{
                                    color: '#ffd700',
                                    filter: 'drop-shadow(0 0 15px #ffd700)'
                                }}
                            />
                        </motion.div>
                        <h1 className="font-display text-4xl md:text-5xl mb-2 neon-text-pink neon-flicker">
                            A Letter For You
                        </h1>
                        <p className="text-cream/60">
                            Page {currentPage + 1} of {totalPages}
                        </p>
                    </motion.div>
                </div>

                {/* Paper Container */}
                <div className="relative z-10 max-w-3xl mx-auto">
                    <motion.div
                        key={currentPage}
                        className="paper-texture rounded-lg p-8 md:p-12 lg:p-16 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        layout
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 45, 146, 0.15)',
                        }}
                    >
                        {/* Paper edges */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-charcoal/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-charcoal/10 to-transparent" />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentPage}
                                custom={direction}
                                variants={pageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    rotateY: { duration: 0.4 },
                                }}
                                style={{ perspective: 1000 }}
                            >
                                <LetterText
                                    pageKey={currentPage}
                                    text={letterContent[currentPage]}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Page curl */}
                        <div
                            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.03) 50%)',
                            }}
                        />
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        className="flex items-center justify-center gap-6 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.button
                            type="button"
                            onClick={goToPrevPage}
                            disabled={currentPage === 0}
                            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                            style={{
                                background: currentPage === 0 ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 45, 146, 0.1)',
                                border: currentPage === 0 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 45, 146, 0.3)',
                                color: currentPage === 0 ? 'rgba(245, 240, 232, 0.3)' : '#ff2d92',
                                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                                boxShadow: currentPage === 0 ? 'none' : '0 0 20px rgba(255, 45, 146, 0.2)'
                            }}
                            whileHover={currentPage > 0 ? { scale: 1.05, x: -3 } : {}}
                            whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Previous</span>
                        </motion.button>

                        {/* Page dots */}
                        <div className="flex gap-2">
                            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                                const isActive = totalPages <= 7
                                    ? i === currentPage
                                    : i === Math.round(currentPage / (totalPages - 1) * 6);

                                return (
                                    <motion.div
                                        key={i}
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: isActive ? 24 : 8,
                                            background: isActive
                                                ? 'linear-gradient(90deg, #ff2d92, #00f5ff)'
                                                : 'rgba(245, 240, 232, 0.3)',
                                            boxShadow: isActive ? '0 0 10px #ff2d92' : 'none'
                                        }}
                                        layout
                                    />
                                );
                            })}
                        </div>

                        <motion.button
                            type="button"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                            style={{
                                background: currentPage === totalPages - 1 ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 45, 146, 0.1)',
                                border: currentPage === totalPages - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 45, 146, 0.3)',
                                color: currentPage === totalPages - 1 ? 'rgba(245, 240, 232, 0.3)' : '#ff2d92',
                                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                                boxShadow: currentPage === totalPages - 1 ? 'none' : '0 0 20px rgba(255, 45, 146, 0.2)'
                            }}
                            whileHover={currentPage < totalPages - 1 ? { scale: 1.05, x: 3 } : {}}
                            whileTap={currentPage < totalPages - 1 ? { scale: 0.95 } : {}}
                            aria-label="Next page"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>

                    <motion.p
                        className="text-center text-cream/30 text-sm mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Use arrow buttons to navigate through the letter
                    </motion.p>
                </div>
            </div>
        </PageTransition>
    );
}
