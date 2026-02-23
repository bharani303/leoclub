import React from 'react';
import { CheckCircle2, UserPlus, Star, Users } from 'lucide-react';
import { Reveal } from '../components/ui/reveal';
import { motion } from 'framer-motion';

const MotionCard = ({ children, className, delay }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
    >
        {children}
    </motion.div>
);

const Membership = () => {
    const benefits = [
        "Develop Leadership Skills",
        "Network with Global Leaders",
        "Gain Project Management Experience",
        "Make Lifelong Friends",
        "Access to LCI Grants",
        "Recognition & Awards",
        "Professional Development",
        "Travel Opportunities"
    ];

    return (
        <section id="membership" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-leo-gold/5 via-background to-background pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leo-blue/10 text-leo-blue text-sm font-semibold mb-6">
                                <UserPlus className="w-4 h-4" /> Join The Movement
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Unlock Your <span className="text-leo-gold">Potential</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Becoming a Leo is more than just volunteering—it's about growth, connection, and making a real impact.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                            {benefits.map((benefit, index) => (
                                <Reveal key={index} delay={0.05 * index}>
                                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <span className="font-medium text-sm">{benefit}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.5}>
                            <button className="px-8 py-4 bg-leo-blue text-white font-bold rounded-full hover:bg-leo-royal transition-all shadow-lg hover:shadow-leo-blue/30 transform hover:-translate-y-1">
                                Apply for Membership
                            </button>
                        </Reveal>
                    </div>

                    {/* Right Cards — removed translate-y-12 which caused overflow on mobile */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-6">
                            <MotionCard delay={0.2} className="bg-white dark:bg-card shadow-xl p-6 rounded-2xl border border-border">
                                <Star className="w-10 h-10 text-leo-gold mb-4" />
                                <h3 className="font-bold text-xl mb-2">Recognition</h3>
                                <p className="text-sm text-muted-foreground">Get recognized for your service with international awards.</p>
                            </MotionCard>
                            <MotionCard delay={0.3} className="mt-8 bg-white dark:bg-card shadow-xl p-6 rounded-2xl border border-border">
                                <Users className="w-10 h-10 text-leo-blue mb-4" />
                                <h3 className="font-bold text-xl mb-2">Community</h3>
                                <p className="text-sm text-muted-foreground">Join a family of 1.4 million volunteers worldwide.</p>
                            </MotionCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Membership;
