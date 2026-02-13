import React from 'react';
import { Music, Palette, Utensils, Users, MapPin, Clock } from 'lucide-react';
import { Reveal } from '../ui/reveal';

const HoliDetails = () => {
    const highlights = [
        {
            icon: Music,
            title: "Live DJ & Dhol",
            description: "Groove to the beats of Non-stop Bollywood & EDM with live Dhol.",
            color: "text-holi-pink bg-holi-pink/10"
        },
        {
            icon: Palette,
            title: "Organic Colors",
            description: "Safe, skin-friendly, and non-toxic organic gulal for everyone.",
            color: "text-holi-purple bg-holi-purple/10"
        },
        {
            icon: Utensils,
            title: "Thandai & Snacks",
            description: "Unlimited Thandai, refreshments, and a lavish lunch buffet.",
            color: "text-holi-yellow bg-holi-yellow/10"
        },
        {
            icon: Users,
            title: "Networking",
            description: "Connect with 500+ young leaders and professionals from the city.",
            color: "text-holi-cyan bg-holi-cyan/10"
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Highlights Grid */}
                <div className="mb-24">
                    <Reveal>
                        <h2 className="text-4xl font-bold text-center mb-16">
                            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-holi-pink to-holi-yellow">Highlights</span>
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((item, index) => (
                            <Reveal key={index} delay={0.1 * index}>
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 text-center group">
                                    <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Schedule & Location */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                    <Reveal>
                        <div>
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Clock className="w-8 h-8 text-holi-cyan" /> Event Schedule
                            </h3>
                            <div className="space-y-6 relative border-l border-white/10 ml-3 pl-8">
                                {[
                                    { time: "09:00 AM", event: "Entry & Welcome Drink" },
                                    { time: "10:00 AM", event: "Holi Kickoff with Dhol" },
                                    { time: "11:30 AM", event: "DJ Madness Begins" },
                                    { time: "01:30 PM", event: "Lunch & Networking" }
                                ].map((slot, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[38px] top-1 w-5 h-5 bg-holi-purple rounded-full border-4 border-slate-950" />
                                        <p className="text-holi-cyan font-mono text-sm mb-1">{slot.time}</p>
                                        <h4 className="text-lg font-bold">{slot.event}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="h-full min-h-[300px] rounded-2xl overflow-hidden relative border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1543835787-19598282362b?q=80&w=2069&auto=format&fit=crop"
                                alt="Event Location"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-6 h-6 text-holi-pink shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-xl font-bold">Leo Grounds</h4>
                                        <p className="text-white/70 text-sm">Avinashi Road, Coimbatore, Tamil Nadu</p>
                                        <a href="#" className="text-holi-yellow text-sm font-semibold mt-2 inline-block hover:underline">Get Directions &rarr;</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

            </div>
        </section>
    );
};

export default HoliDetails;
