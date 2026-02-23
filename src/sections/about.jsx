import React from 'react';
import { Reveal } from '../components/ui/reveal';
import { Users, History, Globe } from 'lucide-react';

import about1 from '../assets/landing/about1.jpg';
import about2 from '../assets/landing/about2.jpg';

const About = () => {
    return (
        <section id="about" className="py-24 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                                What is <span className="text-leo-blue">Leo Club?</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                Leo Clubs are a youth organization of Lions Clubs International. The word "Leo" stands for <strong className="text-leo-gold">Leadership, Experience, Opportunity</strong>.
                            </p>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                We encourage youths to develop leadership qualities by participating in social service activities. With more than 7,200 clubs in over 150 nations, we are the largest youth organization in the world.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Reveal delay={0.5}>
                                <div className="p-6 rounded-2xl bg-white dark:bg-card shadow-lg border border-border hover:shadow-xl transition-shadow group">
                                    <div className="w-12 h-12 bg-leo-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6 text-leo-blue" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Alpha Leos</h3>
                                    <p className="text-muted-foreground text-sm">
                                        For youths aged 12-18. Focuses on individual development and social skills.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.6}>
                                <div className="p-6 rounded-2xl bg-white dark:bg-card shadow-lg border border-border hover:shadow-xl transition-shadow group">
                                    <div className="w-12 h-12 bg-leo-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <History className="w-6 h-6 text-leo-gold" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Omega Leos</h3>
                                    <p className="text-muted-foreground text-sm">
                                        For young adults aged 18-30. Focuses on professional and personal development.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="relative">
                        <Reveal delay={0.4}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 md:translate-y-8">
                                    <img
                                        src={about1}
                                        alt="Group of friends"
                                        loading="lazy"
                                        decoding="async"
                                        className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    <div className="bg-leo-blue text-white p-6 h-64 rounded-2xl shadow-lg">
                                        <Globe className="w-8 h-8 mb-3 text-leo-gold" />
                                        <h4 className="text-2xl font-bold mb-1">150+</h4>
                                        <p className="text-white/70">Countries</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-leo-gold text-leo-blue p-6 rounded-2xl shadow-lg">
                                        <h4 className="text-4xl font-bold mb-1">1957</h4>
                                        <p className="text-leo-blue/70 font-medium">Year Founded</p>
                                    </div>
                                    <img
                                        src={about2}
                                        alt="Team meeting"
                                        loading="lazy"
                                        decoding="async"
                                        className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </Reveal>

                        {/* Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-[120%] bg-gradient-to-tr from-leo-blue/5 to-leo-gold/5 rounded-full blur-3xl opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
