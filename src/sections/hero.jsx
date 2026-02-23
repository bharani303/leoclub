import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import heroImg from '../assets/landing/hero.jpg';

const Hero = memo(() => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Keep parallax but only translate Y (cheaper than opacity+Y together on GPU)
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Parallax Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-leo-blue/70 via-leo-blue/50 to-background z-10" />
                <img
                    src={heroImg}
                    alt="Leo Club volunteers"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-leo-gold/20 text-leo-gold border border-leo-gold/30 backdrop-blur-sm mb-6 font-medium tracking-wide">
                        Youth Wing of Lions Clubs International
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
                >
                    Leadership. <span className="text-leo-gold">Experience.</span> Opportunity.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Join a global network of young leaders dedicated to making a positive impact in their communities and around the world.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button className="px-8 py-4 bg-leo-gold text-leo-blue text-lg font-bold rounded-full hover:bg-leo-yellow transform hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center gap-2">
                        Join the Movement <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                        Learn More
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
            >
                <span className="text-sm font-light tracking-widest uppercase opacity-70">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.div>
        </section>
    );
});

Hero.displayName = 'Hero';
export default Hero;
