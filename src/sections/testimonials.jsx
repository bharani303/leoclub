import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../components/ui/reveal';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Club President, 2023",
            content: "Joining Leo Club was the best decision of my life. I've learned how to lead a team and made friends from all over the world.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
        },
        {
            name: "David Chen",
            role: "District Chairperson",
            content: "The opportunities for personal growth are unmatched. From organizing food drives to international conventions, every moment is valuable.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
        },
        {
            name: "Maria Garcia",
            role: "Leo Advisor",
            content: "Watching these young leaders grow and serve their communities with such passion gives me hope for the future.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-24 bg-leo-blue/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <h2 className="text-4xl font-bold mb-12">Stories of Impact</h2>
                </Reveal>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border"
                        >
                            <Quote className="w-12 h-12 text-leo-gold mx-auto mb-6 opacity-50" />
                            <p className="text-xl md:text-2xl font-serif italic mb-8 text-foreground leading-relaxed">
                                "{testimonials[currentIndex].content}"
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-leo-gold"
                                />
                                <div className="text-left">
                                    <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                                    <p className="text-sm text-leo-blue font-medium">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={prev} className="p-2 rounded-full bg-white dark:bg-card shadow-md hover:bg-leo-gold hover:text-white transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-leo-gold' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                        <button onClick={next} className="p-2 rounded-full bg-white dark:bg-card shadow-md hover:bg-leo-gold hover:text-white transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
