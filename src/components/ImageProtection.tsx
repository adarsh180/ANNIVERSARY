'use client';

import React, { useEffect, useCallback, ReactNode, useState } from 'react';

interface ImageProtectionProps {
    children: ReactNode;
    className?: string;
}

/**
 * Enhanced Image Protection Component
 * ====================================
 * Multi-layer protection for desktop, tablet, and mobile:
 * - Disable right-click context menu
 * - Block keyboard shortcuts (Ctrl+S, PrintScreen, etc.)
 * - Disable drag and drop
 * - Blur content when PrintScreen/screenshot is detected
 * - Blur on visibility change (tab switch)
 * - Blur on window blur (switching apps - catches mobile screenshot)
 * - Touch event detection for mobile screenshot gestures
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

    // Block long press on mobile (prevents save image dialog)
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        // Prevent context menu on long press
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, []);

    // Block keyboard shortcuts and detect screenshot attempts
    useEffect(() => {
        let blurTimeout: NodeJS.Timeout;

        const triggerBlur = (duration = 3000) => {
            setIsBlurred(true);
            clearTimeout(blurTimeout);
            blurTimeout = setTimeout(() => setIsBlurred(false), duration);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Block common save/copy shortcuts
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
                triggerBlur();
                return false;
            }

            // Detect Windows screenshot shortcuts (Win+Shift+S)
            if (e.key === 's' && e.shiftKey && e.metaKey) {
                triggerBlur();
            }

            // Detect Mac screenshot (Cmd+Shift+3 or Cmd+Shift+4)
            if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) {
                triggerBlur();
            }
        };

        // Detect keyup for PrintScreen
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'PrintScreen') {
                triggerBlur();
            }
        };

        // Block copy
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Blur on tab switch (visibility change) - works on all devices
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsBlurred(true);
            } else {
                setTimeout(() => setIsBlurred(false), 500);
            }
        };

        // Blur on window blur (switching apps) - critical for mobile screenshots
        // On iOS/Android, taking a screenshot often triggers window blur
        const handleWindowBlur = () => {
            triggerBlur(2000);
        };

        const handleWindowFocus = () => {
            setTimeout(() => setIsBlurred(false), 300);
        };

        // Detect touch events that might indicate screenshot gesture
        // Many phones use power + volume down simultaneously
        let volumeKeyPressed = false;
        let powerKeyPressed = false;

        const handleTouchKeyCombo = (e: KeyboardEvent) => {
            if (e.key === 'VolumeDown' || e.key === 'AudioVolumeDown') {
                volumeKeyPressed = true;
            }
            // Power button often appears as different key
            if (e.key === 'Power' || e.key === 'Sleep') {
                powerKeyPressed = true;
            }
            // If both pressed - likely screenshot
            if (volumeKeyPressed && powerKeyPressed) {
                triggerBlur();
            }
        };

        const handleTouchKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'VolumeDown' || e.key === 'AudioVolumeDown') {
                volumeKeyPressed = false;
            }
            if (e.key === 'Power' || e.key === 'Sleep') {
                powerKeyPressed = false;
            }
        };

        // Prevent touch hold/callout on iOS
        const preventTouchCallout = () => {
            const body = document.body as HTMLElement & { style: CSSStyleDeclaration & { webkitTouchCallout?: string; webkitUserSelect?: string } };
            body.style.webkitTouchCallout = 'none';
            body.style.webkitUserSelect = 'none';
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keydown', handleTouchKeyCombo);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keyup', handleTouchKeyUp);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);

        // Apply iOS prevention
        preventTouchCallout();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', handleTouchKeyCombo);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keyup', handleTouchKeyUp);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleWindowBlur);
            window.removeEventListener('focus', handleWindowFocus);
            clearTimeout(blurTimeout);
        };
    }, []);

    return (
        <div
            className={`protected-content relative ${className}`}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            style={{
                // Prevent iOS callout and selection
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
            }}
        >
            {/* Content with smooth blur effect when screenshot detected */}
            <div
                className={`transition-all duration-300 ease-out ${isBlurred ? 'blur-xl scale-95 opacity-50' : ''}`}
                style={{
                    // GPU acceleration for smooth blur transition
                    transform: isBlurred ? 'scale(0.95) translateZ(0)' : 'translateZ(0)',
                    willChange: 'filter, transform, opacity',
                }}
            >
                {children}
            </div>

            {/* Warning message when blurred */}
            {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div
                        className="glass-premium rounded-2xl px-8 py-4 text-center animate-pulse"
                        style={{
                            background: 'rgba(20, 20, 20, 0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(232, 168, 124, 0.3)',
                            boxShadow: '0 0 40px rgba(232, 168, 124, 0.2)',
                        }}
                    >
                        <p className="text-neon-pink font-display text-xl" style={{ color: '#ff6b6b' }}>
                            🔒 Protected Content
                        </p>
                        <p className="text-cream/60 text-sm mt-1">
                            Screenshots are not allowed
                        </p>
                    </div>
                </div>
            )}

            {/* Invisible overlay to intercept interactions */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'transparent',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                }}
            />
        </div>
    );
}
