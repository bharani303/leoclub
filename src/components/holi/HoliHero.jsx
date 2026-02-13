import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import Countdown from './Countdown';

import h1 from '../../assets/holi/h1.jpg';
import h2 from '../../assets/holi/h2.jpg';
import h3 from '../../assets/holi/h3.jpg';
import h4 from '../../assets/holi/h4.jpg';

const images = [h1, h2, h3, h4];

const HoliHero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [currentImage, setCurrentImage] = useState(0);

    // Image Rotator
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-blue-950">

            {/* Background Image with Dark Overlay - Corporate Style */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={images[currentImage]}
                        alt="Background"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
                    />
                </AnimatePresence>
                {/* Professional Overlay: Deep Blue/Navy */}
                <div className="absolute inset-0 bg-blue-950/80Mix bg-gradient-to-b from-blue-950/90 via-blue-950/70 to-blue-950/95 z-10" />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-900/40 backdrop-blur-sm border border-yellow-500/30 text-white mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="font-bold tracking-widest uppercase text-xs md:text-sm text-yellow-500">Official Leo Club Event</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center justify-center font-bold mb-6 tracking-tight"
                >
                    <span className="text-5xl md:text-7xl text-white drop-shadow-lg">
                        HOLI GATHERING
                    </span>
                    <span className="text-6xl md:text-8xl text-yellow-500 mt-2">
                        2026
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-blue-100/90 font-light mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Fostering <span className="text-yellow-400 font-medium">Leadership</span>, <span className="text-yellow-400 font-medium">Unity</span>, and <span className="text-yellow-400 font-medium">Tradition</span>.
                    <br className="hidden md:block" /> Join us for an evening of professional networking and cultural celebration.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6 mb-16"
                >
                    <div className="flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-yellow-500" />
                        <span className="text-lg text-white font-medium">March 8, 2026</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-700 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-yellow-500" />
                        <span className="text-lg text-white font-medium">Coimbatore, TN</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-12"
                >
                    {/* Countdown component might need style override if it has hardcoded black text */}
                    <div className="text-white">
                        <Countdown targetDate="2026-03-08T10:00:00" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <button
                        onClick={() => document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-4 bg-yellow-500 text-blue-950 font-bold rounded-md hover:bg-yellow-400 transition-all text-lg shadow-lg hover:shadow-yellow-500/20 uppercase tracking-wide"
                    >
                        Reserve Your Seat
                    </button>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-200/50 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    );
};

export default HoliHero;
