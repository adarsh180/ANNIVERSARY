'use client';

import React, { useEffect, useCallback, ReactNode, useState } from 'react';

interface ImageProtectionProps {
    children: ReactNode;
    className?: string;
}

/**
 * Enhanced Image Protection Component
 * ====================================
 * Multi-layer protection to prevent image downloading:
 * - Disable right-click context menu
 * - Block keyboard shortcuts (Ctrl+S, PrintScreen, etc.)
 * - Disable drag and drop
 * - Blur content when PrintScreen is detected
 * - Blur on visibility change (tab switch)
 * 
 * NOTE: True screenshot prevention is impossible in browsers.
 * These measures deter casual saving and blur on screenshot attempts.
 */
export default function ImageProtection({ children, className = '' }: ImageProtectionProps) {
    const [isBlurred, setIsBlurred] = useState(false);

    // Block right-click
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        return false;
    }, []);

    // Block drag
    const handleDragStart = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        return false;
    }, []);

    // Block keyboard shortcuts and detect screenshot attempts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Block Ctrl+S, Ctrl+Shift+S, Ctrl+P
            if (
                (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) ||
                (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S' || e.key === 'i' || e.key === 'I')) ||
                (e.ctrlKey && e.key === 'u') || // View source
                (e.ctrlKey && e.shiftKey && e.key === 'c') // Inspect element
            ) {
                e.preventDefault();
                return false;
            }

            // Detect PrintScreen - blur immediately
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                setIsBlurred(true);
                // Unblur after 3 seconds
                setTimeout(() => setIsBlurred(false), 3000);
                return false;
            }

            // Detect Windows screenshot shortcuts
            // Win+Shift+S (Snipping Tool)
            if (e.key === 's' && e.shiftKey && e.metaKey) {
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 3000);
            }
        };

        // Detect keyup for PrintScreen (some browsers fire on keyup)
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'PrintScreen') {
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 3000);
            }
        };

        // Block copy
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Blur on tab switch (visibility change)
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsBlurred(true);
            } else {
                // Small delay before unblur
                setTimeout(() => setIsBlurred(false), 500);
            }
        };

        // Blur on window blur (switching to another app like Snipping Tool)
        const handleWindowBlur = () => {
            setIsBlurred(true);
        };

        const handleWindowFocus = () => {
            setTimeout(() => setIsBlurred(false), 500);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleWindowBlur);
            window.removeEventListener('focus', handleWindowFocus);
        };
    }, []);

    return (
        <div
            className={`protected-content relative ${className}`}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
        >
            {/* Content with blur effect when screenshot detected */}
            <div
                className={`transition-all duration-200 ${isBlurred ? 'blur-xl scale-95 opacity-50' : ''}`}
            >
                {children}
            </div>

            {/* Warning message when blurred */}
            {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="glass-premium rounded-2xl px-8 py-4 text-center">
                        <p className="text-neon-pink font-display text-xl">🔒 Protected Content</p>
                        <p className="text-cream/60 text-sm mt-1">Screenshots are not allowed</p>
                    </div>
                </div>
            )}

            {/* Invisible overlay to intercept interactions */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'transparent',
                    userSelect: 'none',
                }}
            />
        </div>
    );
}
