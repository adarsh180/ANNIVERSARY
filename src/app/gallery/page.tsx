'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import ImageProtection from '@/components/ImageProtection';
import { galleryPhotos } from '@/data/galleryData';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles, Shield } from 'lucide-react';
import Image from 'next/image';

/**
 * Gallery Page - Neon Redesign with Enhanced Protection
 * ======================================================
 * Apple Photos style grid with glassmorphism lightbox.
 * Multi-layer photo protection enabled.
 */

export default function GalleryPage() {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedPhoto(index);
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
    };

    const goToPrev = () => {
        if (selectedPhoto !== null) {
            setSelectedPhoto(selectedPhoto === 0 ? galleryPhotos.length - 1 : selectedPhoto - 1);
        }
    };

    const goToNext = () => {
        if (selectedPhoto !== null) {
            setSelectedPhoto(selectedPhoto === galleryPhotos.length - 1 ? 0 : selectedPhoto + 1);
        }
    };

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <PageTransition>
            <ImageProtection>
                <div className="min-h-screen relative overflow-hidden py-24 px-4">
                    {/* Background */}
                    <div className="absolute inset-0 page-bg" />

                    {/* Floating Hearts */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[8, 20, 35, 50, 65, 78, 90].map((left, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{ left: `${left}%`, bottom: '-50px' }}
                                animate={{
                                    y: [0, -1500],
                                    opacity: [0.2, 0.4, 0],
                                    rotate: [0, 180],
                                }}
                                transition={{
                                    duration: 14 + i * 2,
                                    delay: i * 1.2,
                                    repeat: Infinity,
                                }}
                            >
                                <Heart
                                    size={16 + i * 2}
                                    fill="currentColor"
                                    style={{
                                        color: i % 2 === 0 ? '#ff2d92' : '#00f5ff',
                                        filter: `drop-shadow(0 0 8px ${i % 2 === 0 ? '#ff2d92' : '#00f5ff'})`
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="relative z-10 text-center mb-12 pt-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Camera
                                    className="w-10 h-10 mx-auto mb-4"
                                    style={{
                                        color: '#ffd700',
                                        filter: 'drop-shadow(0 0 15px #ffd700)'
                                    }}
                                />
                            </motion.div>
                            <h1 className="font-display text-4xl md:text-5xl mb-4 neon-text-pink neon-flicker">
                                Our Memories
                            </h1>
                            <p className="text-cream/60 max-w-lg mx-auto mb-2">
                                Every picture tells a story of us. Click on any photo to view it closer.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-cream/40 text-sm">
                                <Shield className="w-4 h-4" style={{ color: '#00f5ff' }} />
                                <span>Protected Gallery</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Photo Grid */}
                    <motion.div
                        className="relative z-10 max-w-6xl mx-auto gallery-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {galleryPhotos.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <motion.div
                                        className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                                        whileHover={{
                                            scale: 1.03,
                                            y: -8,
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                                        }}
                                    >
                                        {/* Photo */}
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                            draggable={false}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                                        {/* Neon border on hover */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                boxShadow: 'inset 0 0 0 2px #ff2d92, 0 0 20px #ff2d92'
                                            }}
                                        />

                                        {/* Caption on hover */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 p-4"
                                            initial={{ y: 20, opacity: 0 }}
                                        >
                                            <p className="text-cream text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                {photo.caption}
                                            </p>
                                        </motion.div>

                                        {/* Heart icon on hover */}
                                        <motion.div
                                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        >
                                            <Heart
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                style={{
                                                    color: '#ff2d92',
                                                    filter: 'drop-shadow(0 0 8px #ff2d92)'
                                                }}
                                            />
                                        </motion.div>

                                        {/* Sparkle effect */}
                                        <motion.div
                                            className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Sparkles
                                                className="w-4 h-4"
                                                style={{ color: '#ffd700', filter: 'drop-shadow(0 0 6px #ffd700)' }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Photo count */}
                    <motion.p
                        className="text-center text-cream/40 mt-12 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {galleryPhotos.length} precious memories and counting... 💕
                        </motion.span>
                    </motion.p>

                    {/* Lightbox Modal */}
                    <AnimatePresence>
                        {selectedPhoto !== null && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeLightbox}
                                style={{
                                    background: 'rgba(10, 10, 10, 0.95)',
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                {/* Close button */}
                                <motion.button
                                    type="button"
                                    className="absolute top-6 right-6 z-10 p-2 rounded-full"
                                    onClick={closeLightbox}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        background: 'rgba(255, 45, 146, 0.2)',
                                        border: '1px solid rgba(255, 45, 146, 0.4)'
                                    }}
                                >
                                    <X className="w-6 h-6" style={{ color: '#ff2d92' }} />
                                </motion.button>

                                {/* Navigation arrows */}
                                <motion.button
                                    type="button"
                                    className="absolute left-4 md:left-8 z-10 p-3 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                    whileHover={{ scale: 1.2, x: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        background: 'rgba(0, 245, 255, 0.1)',
                                        border: '1px solid rgba(0, 245, 255, 0.3)'
                                    }}
                                >
                                    <ChevronLeft className="w-8 h-8" style={{ color: '#00f5ff' }} />
                                </motion.button>

                                <motion.button
                                    type="button"
                                    className="absolute right-4 md:right-8 z-10 p-3 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                    whileHover={{ scale: 1.2, x: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        background: 'rgba(0, 245, 255, 0.1)',
                                        border: '1px solid rgba(0, 245, 255, 0.3)'
                                    }}
                                >
                                    <ChevronRight className="w-8 h-8" style={{ color: '#00f5ff' }} />
                                </motion.button>

                                {/* Main image */}
                                <motion.div
                                    className="relative max-w-4xl max-h-[85vh] w-full mx-4"
                                    initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                                    transition={{ duration: 0.4, type: "spring" }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <motion.div
                                            key={selectedPhoto}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative"
                                            style={{
                                                boxShadow: '0 0 60px rgba(255, 45, 146, 0.3)'
                                            }}
                                        >
                                            <Image
                                                src={galleryPhotos[selectedPhoto].src}
                                                alt={galleryPhotos[selectedPhoto].alt}
                                                width={800}
                                                height={1000}
                                                className="max-h-[80vh] w-auto object-contain rounded-xl"
                                                priority
                                                draggable={false}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Caption */}
                                    <motion.div
                                        className="text-center mt-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <p className="font-handwritten text-2xl neon-text-pink">
                                            {galleryPhotos[selectedPhoto].caption}
                                        </p>
                                        <p className="text-cream/40 text-sm mt-2">
                                            {selectedPhoto + 1} / {galleryPhotos.length}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ImageProtection>
        </PageTransition>
    );
}
