import React from 'react';
import { Music, Palette, Utensils, Users, Award, Camera, Trophy, Map } from 'lucide-react';
import { Reveal } from '../ui/reveal';
import { motion } from 'framer-motion';

import h1 from '../../assets/holi/h1.jpg';
import h2 from '../../assets/holi/h2.jpg';
import h3 from '../../assets/holi/h3.jpg';
import h4 from '../../assets/holi/h4.jpg';

const Highlights = () => {
    const events = [
        {
            icon: Music,
            title: "DJ & Dhol Madness",
            desc: "Non-stop EDM & Bollywood beats with live Nashik Dhol.",
            gradient: "from-pink-500 to-rose-500",
            img: h1
        },
        {
            icon: Palette,
            title: "Organic Colors",
            desc: "100% skin-safe, herbal gulal. Eco-friendly celebration.",
            gradient: "from-purple-500 to-indigo-500",
            img: h2
        },
        {
            icon: Utensils,
            title: "Grand Feast",
            desc: "Unlimited Thandai, Chaat counters & Lavish Buffet Lunch.",
            gradient: "from-yellow-400 to-orange-500",
            img: h3
        },
        {
            icon: Trophy,
            title: "Games & Prizes",
            desc: "Tug of War, Balloon fight & exciting team building games.",
            gradient: "from-cyan-400 to-blue-500",
            img: h4
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-blue-900 font-bold tracking-widest uppercase mb-2 block text-sm">Why Attend</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Event <span className="text-blue-950 border-b-4 border-yellow-500">Highlights</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="group relative h-80 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="absolute inset-0">
                                    <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    {/* Professional Dark Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />
                                </div>

                                <div className="relative h-full p-8 flex flex-col justify-end z-10">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white border border-white/20">
                                        <event.icon className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-slate-200 text-base font-medium leading-relaxed">{event.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Additional Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { icon: Camera, label: "Photo Booth", val: "Unlimited" },
                        { icon: Users, label: "Students", val: "2000+" },
                        { icon: Award, label: "Certificates", val: "For All" },
                        { icon: Map, label: "Acres", val: "5+" }
                    ].map((item, i) => (
                        <Reveal key={i} delay={0.4 + (i * 0.1)}>
                            <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 text-center hover:bg-white/80 transition-colors shadow-sm hover:shadow-md">
                                <item.icon className="w-8 h-8 mx-auto mb-3 text-pink-500 opacity-90" />
                                <h4 className="text-2xl font-bold text-slate-800 mb-1">{item.val}</h4>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{item.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Highlights;
