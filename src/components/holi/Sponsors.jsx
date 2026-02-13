import React from 'react';
import { Reveal } from '../ui/reveal';
import { Handshake, Mail, Building2, Trophy, Radio, ShoppingBag } from 'lucide-react';

const Sponsors = () => {
    return (
        <center>
        <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50/50 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase mb-4">
                            Strategic Alliances
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Corporate <span className="text-blue-900">Partners</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                            We are proud to be supported by industry leaders who share our vision of youth leadership and cultural celebration.
                        </p>
                    </div>
                </Reveal>

                {/* Platinum / Headline Sponsor */}
                <Reveal delay={0.2}>
                    <div className="mb-16">
                        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Headline Sponsor</p>
                        <div className="flex justify-center">
                            <div className="w-full max-w-lg h-40 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center p-8 hover:shadow-lg transition-shadow group">
                                {/* Placeholder for Jio */}
                                <div className="text-center group-hover:scale-105 transition-transform">
                                    <div className="text-5xl font-black text-blue-900 tracking-tighter">Jio</div>
                                    <div className="text-xs text-slate-400 tracking-widest uppercase mt-1">Digital Life</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Gold Sponsors */}
                <Reveal delay={0.4}>
                    <div className="mb-16">
                        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Associate Partners</p>
                        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                            {[
                                { name: "Spotify", icon: Radio, color: "text-green-600", bg: "bg-green-50" },
                                { name: "Snapchat", icon: Handshake, color: "text-yellow-500", bg: "bg-yellow-50" },
                                { name: "Decathlon", icon: Trophy, color: "text-blue-600", bg: "bg-blue-50" }
                            ].map((sponsor, idx) => (
                                <div key={idx} className="h-28 w-full sm:w-64 bg-white border border-slate-100 rounded-xl flex items-center justify-center gap-4 px-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className={`w-12 h-12 rounded-full ${sponsor.bg} flex items-center justify-center shrink-0`}>
                                        <sponsor.icon className={`w-6 h-6 ${sponsor.color}`} />
                                    </div>
                                    <span className="text-xl font-bold text-slate-800">{sponsor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Media & Other Partners */}
                <Reveal delay={0.6}>
                    <div className="mb-20">
                        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Media & Gifting Partners</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                            {["Radio City", "Red Bull", "Times of India", "Swiggy"].map((name, i) => (
                                <span key={i} className="text-xl font-bold text-slate-400 uppercase tracking-wide hover:text-blue-900 transition-colors cursor-default">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* CTA */}
                <Reveal delay={0.8}>
                    <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 rounded-full blur-[60px]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-[60px]" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4">Interested in Sponsoring?</h3>
                            <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                                Showcase your brand to 5000+ students and professionals at the biggest Holi event in Coimbatore.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-yellow-500 text-blue-950 font-bold rounded-full hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
                                    <Handshake className="w-5 h-5" /> Become a Partner
                                </button>
                                <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/10">
                                    <Mail className="w-5 h-5" /> Request a Deck
                                </button>
                            </div>
                        </div>
                    </div>
                </Reveal>

            </div>
        </section>
        
</center>
    );
};

export default Sponsors;
