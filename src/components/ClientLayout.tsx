'use client';

import React from 'react';
import { AudioProvider } from '@/context/AudioContext';
import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';

/**
 * Client Layout Component
 * =======================
 * Wraps the app with client-side providers and global components.
 * Contains AudioProvider for global music state,
 * Navigation for page links, and AudioPlayer for music controls.
 */
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AudioProvider>
            {/* Background that persists across pages */}
            <div className="page-bg" />

            {/* Global Navigation */}
            <Navigation />

            {/* Page Content */}
            <main>{children}</main>

            {/* Persistent Audio Player */}
            <AudioPlayer />
        </AudioProvider>
    );
}
