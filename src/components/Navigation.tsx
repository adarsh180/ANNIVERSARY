'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, MapPin, Mail, Images, Sparkles, Crown } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

const navItems = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/journey', label: 'Journey', icon: MapPin },
    { href: '/letter', label: 'Letter', icon: Mail },
    { href: '/gallery', label: 'Gallery', icon: Images },
    { href: '/future', label: 'Future', icon: Sparkles },
    { href: '/promises', label: 'Promises', icon: Crown },
];

/**
 * Navigation Component - Neon Glassmorphism Redesign
 * ===================================================
 * Apple-style blur navbar with neon active states.
 */
export default function Navigation() {
    const pathname = usePathname();
    const { hasStarted } = useAudio();

    if (!hasStarted || pathname === '/') return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 px-4 py-4"
        >
            <div className="max-w-4xl mx-auto">
                <div
                    className="rounded-full px-6 py-3 flex items-center justify-center"
                    style={{
                        background: 'rgba(10, 10, 10, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 45, 146, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 45, 146, 0.1)'
                    }}
                >
                    <ul className="flex items-center gap-1 md:gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
                                        style={{
                                            color: isActive ? '#ff2d92' : 'rgba(245, 240, 232, 0.7)',
                                            background: isActive ? 'rgba(255, 45, 146, 0.15)' : 'transparent',
                                            boxShadow: isActive ? '0 0 20px rgba(255, 45, 146, 0.3)' : 'none',
                                        }}
                                    >
                                        <motion.div
                                            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <Icon
                                                className="w-4 h-4"
                                                style={{
                                                    filter: isActive ? 'drop-shadow(0 0 6px #ff2d92)' : 'none'
                                                }}
                                            />
                                        </motion.div>
                                        <span className="hidden md:inline text-sm font-medium">
                                            {item.label}
                                        </span>

                                        {/* Neon underline for active */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute -bottom-1 left-1/2 w-1/2 h-0.5"
                                                style={{
                                                    transform: 'translateX(-50%)',
                                                    background: 'linear-gradient(90deg, #ff2d92, #00f5ff)',
                                                    boxShadow: '0 0 10px #ff2d92'
                                                }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}
