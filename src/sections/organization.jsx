import React from 'react';
import { Reveal } from '../components/ui/reveal';
import { Users, Globe2, Building, Star, Shield, Zap } from 'lucide-react';
import { Counter } from '../components/ui/counter';

const Organization = () => {
    const districtStructure = [
        "District Governor (Lions)",
        "First & Second Vice District Governors",
        "District Cabinet Members",
        "District Leo Chairman",
        "Leo District President",
        "Zone Chairs",
        "Club Presidents & Secretaries",
    ];

    return (
        <section className="py-24 bg-leo-blue text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <Reveal>
                    <div className="text-center mb-16 w-full">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leo-gold/20 border border-leo-gold/40 text-leo-gold text-xs font-bold uppercase tracking-widest mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-leo-gold animate-pulse" />
                            Lions International
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                            District <span className="text-leo-gold">324 1D</span> — Tamil Nadu, India
                        </h2>
                        <p className="max-w-2xl mx-auto text-white/70 text-center text-lg leading-relaxed">
                            A dynamic service district committed to humanitarian service, youth empowerment,
                            and community development across Tamil Nadu and surrounding regions.
                        </p>
                    </div>
                </Reveal>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16">
                    <Reveal delay={0.1}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Building className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={45} suffix="+" />
                            </h3>
                            <p className="text-white/70 font-medium">Lions Clubs</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Users className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={20} suffix="+" />
                            </h3>
                            <p className="text-white/70 font-medium">Leo Clubs</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-colors w-full">
                            <Globe2 className="w-12 h-12 text-leo-gold mx-auto mb-4" />
                            <h3 className="text-5xl font-bold mb-2 flex justify-center gap-1">
                                <Counter value={500} suffix="+" />
                            </h3>
                            <p className="text-white/70 font-medium">Service Projects</p>
                        </div>
                    </Reveal>
                </div>

                {/* District Structure */}
                <Reveal delay={0.2}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-leo-gold" />
                            <h3 className="text-xl font-bold text-leo-gold">District Structure</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {districtStructure.map((role, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-leo-gold shrink-0" />
                                    {role}
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Link */}
                <Reveal delay={0.4}>
                    <div className="mt-10 text-center w-full">
                        <a
                            href="https://www.lionsclubs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-leo-gold hover:text-white font-semibold transition-colors"
                        >
                            Learn more about Lions Clubs International &rarr;
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Organization;
