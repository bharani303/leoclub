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
            title: "Vision Programs",
            category: "Eye Care",
            description: "Eye screening camps, cataract surgery support & spectacle distribution.",
            image: sightImg
        },
        {
            title: "Blood & Health Camps",
            category: "Health",
            description: "Blood donation drives, medical camps & diabetes awareness programs.",
            image: healthImg
        },
        {
            title: "Hunger Relief",
            category: "Food & Community",
            description: "Food distribution drives and community feeding programs.",
            image: hungerImg
        },
        {
            title: "Tree Plantation",
            category: "Environment",
            description: "Tree plantation drives, plastic-free campaigns & clean-up initiatives.",
            image: envImg
        },
        {
            title: "Education Support",
            category: "Literacy",
            description: "Government school support, notebook & uniform distribution, scholarships.",
            image: litImg
        },
        {
            title: "Disaster Relief",
            category: "Humanitarian",
            description: "Rapid response for disaster-affected communities across Tamil Nadu.",
            image: humImg
        }
    ];

    return (
        <section id="activities" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Major <span className="text-leo-gold">Service Areas</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            District 324 1D Leo Clubs actively serve across six major humanitarian pillars in Tamil Nadu.
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
                        <Reveal key={index} delay={0.08 * index}>
                            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="text-leo-gold text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {activity.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">{activity.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-2">
                                        {activity.description}
                                    </p>
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
