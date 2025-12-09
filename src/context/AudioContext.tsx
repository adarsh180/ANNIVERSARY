'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    isMuted: boolean;
    hasStarted: boolean;
    togglePlay: () => void;
    toggleMute: () => void;
    startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}

interface AudioProviderProps {
    children: ReactNode;
}

/**
 * Audio Provider Component
 * ========================
 * Provides global audio state for the persistent music player.
 * 
 * CUSTOMIZATION: Change the audio source path in the audioRef src below.
 * Place your audio file in /public/audio/ folder.
 */
export function AudioProvider({ children }: AudioProviderProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // On mount, check localStorage for persisted hasStarted state
    useEffect(() => {
        const stored = localStorage.getItem('anniversaryHasStarted');
        if (stored === 'true') {
            setHasStarted(true);
        }
    }, []);

    useEffect(() => {
        // Create audio element
        const audio = new Audio('/audio/love-me-like-you-do.mp3'); // CUSTOMIZE: Change audio file path
        audio.loop = true;
        audio.volume = 0.5;

        // Handle audio load error gracefully (when file is missing)
        audio.addEventListener('error', () => {
            console.warn('Audio file not found. Please add your audio file to /public/audio/love-me-like-you-do.mp3');
        });

        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const startAudio = () => {
        // Always set hasStarted to true to allow navigation and show UI
        // even if audio file is missing
        setHasStarted(true);
        // Persist to localStorage so navbar stays visible after refresh
        localStorage.setItem('anniversaryHasStarted', 'true');

        if (audioRef.current && !isPlaying) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                // Silently handle audio errors (file missing, autoplay blocked, etc.)
                console.log('Audio playback info:', error.message);
            });
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                });
            }
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, isMuted, hasStarted, togglePlay, toggleMute, startAudio }}>
            {children}
        </AudioContext.Provider>
    );
}

export default AudioProvider;
