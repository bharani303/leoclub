import React from 'react';
import { Reveal } from '../components/ui/reveal';

import envImg from '../assets/activities/environment.jpg';
import healthImg from '../assets/activities/health.jpg';
import hungerImg from '../assets/activities/hunger.jpg';
import litImg from '../assets/activities/literacy.jpg';
import humImg from '../assets/activities/humanitarian.jpg';
import sightImg from '../assets/activities/sight.jpg';

const Activities = () => {
    const activities = [
        {
            title: "Tree Plantation",
            category: "Environment",
            image: envImg
        },
        {
            title: "Blood Donation",
            category: "Health",
            image: healthImg
        },
        {
            title: "Food Drive",
            category: "Hunger Relief",
            image: hungerImg
        },
        {
            title: "Education Support",
            category: "Literacy",
            image: litImg
        },
        {
            title: "Disaster Relief",
            category: "Humanitarian",
            image: humImg
        },
        {
            title: "Vision Screening",
            category: "Sight",
            image: sightImg
        }
    ];

    return (
        <section id="activities" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-leo-gold">Impact</span></h2>
                        <p className="text-muted-foreground max-w-xl">
                            From local initiatives to global campaigns, Leos are making a difference everywhere.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <button className="hidden md:inline-flex px-6 py-3 border border-leo-blue text-leo-blue hover:bg-leo-blue hover:text-white rounded-full transition-all font-semibold">
                            View All Projects
                        </button>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-leo-gold text-sm font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100 slide-in-from-bottom-2">
                                        {activity.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-1">{activity.title}</h3>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="px-6 py-3 border border-leo-blue text-leo-blue hover:bg-leo-blue hover:text-white rounded-full transition-all font-semibold w-full">
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Activities;
