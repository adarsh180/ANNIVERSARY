'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

/**
 * Page Transition Component
 * =========================
 * Wraps page content with smooth fade and slide animations.
 * Uses Framer Motion for cinematic page transitions.
 */
export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] // Custom ease for smooth feel
            }}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
}
