import React from 'react';
import { ShieldAlert, Droplets, Trash2, IdCard } from 'lucide-react';
import { Reveal } from '../ui/reveal';

const Safety = () => {
    const guidelines = [
        {
            icon: Droplets,
            title: "Safe Colors Only",
            text: "Strictly organic and herbal colors. No chemical paints or grease allowed."
        },
        {
            icon: ShieldAlert,
            title: "Zero Tolerance",
            text: "Any misconduct or harassment will lead to immediate disqualification and removal."
        },
        {
            icon: IdCard,
            title: "ID Mandatory",
            text: "Valid College ID card is compulsory for entry. No ID, No Entry."
        },
        {
            icon: Trash2,
            title: "Eco-Friendly",
            text: "Please use dustbins. Let's keep our venue clean and green."
        }
    ];

    return (
        <section className="py-20 bg-blue-950 relative border-t border-blue-900">
            <div className="max-w-6xl mx-auto px-6">
                <Reveal>
                    <div className="bg-transparent">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">
                            <span className="border-b-2 border-yellow-500 pb-2">Guidelines</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {guidelines.map((item, index) => (
                                <div key={index} className="text-center group p-6 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-blue-900 rounded-full flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-blue-200 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Safety;
