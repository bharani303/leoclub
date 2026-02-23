import React from 'react';
import { Reveal } from '../components/ui/reveal';
import { Users, Globe2, Building } from 'lucide-react';
import { Counter } from '../components/ui/counter';

const Organization = () => {
    return (
        <section className="py-24 bg-leo-blue text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header — centered, full width */}
                <Reveal>
                    <div className="text-center mb-16 w-full">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                            Powered by <span className="text-leo-gold">Lions Clubs International</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-white/70 text-center">
                            The world's largest service club organization. We have more volunteers in more places than any other service club organization.
                        </p>
                    </div>
                </Reveal>

                {/* Stat cards — stacks to 1 col on mobile, 3 on md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    <Reveal delay={0.1}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Users className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={1.4} suffix="M+" />
                            </h3>
                            <p className="text-white/70 font-medium">Members Worldwide</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Globe2 className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={200} suffix="+" />
                            </h3>
                            <p className="text-white/70 font-medium">Countries & Regions</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Building className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={49000} suffix="+" />
                            </h3>
                            <p className="text-white/70 font-medium">Clubs</p>
                        </div>
                    </Reveal>
                </div>

                {/* Link */}
                <Reveal delay={0.4}>
                    <div className="mt-16 text-center w-full">
                        <a
                            href="https://www.lionsclubs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-leo-gold hover:text-white font-semibold transition-colors"
                        >
                            Read more about LCI &rarr;
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Organization;
