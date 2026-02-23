import React from 'react';
import { Reveal } from '../components/ui/reveal';

const Timeline = () => {
    const events = [
        { year: "1957", title: "Leo Club Founded", description: "The first Leo Club was established in Pennsylvania, USA, by the Abington Lions Club — the beginning of a global movement." },
        { year: "1967", title: "LCI Official Adoption", description: "Lions Clubs International officially adopted the Leo Club Program, expanding youth service globally." },
        { year: "D·324", title: "District 324 1D Formed", description: "District 324 1D was established in Tamil Nadu, India, bringing Lions and Leo Clubs together for coordinated community service." },
        { year: "2024", title: "Growing Impact", description: "Today District 324 1D runs 45+ Lions Clubs and 20+ Leo Clubs, delivering 500+ service projects annually across Tamil Nadu." }
    ];

    return (
        <section id="history" className="py-24 bg-background">
            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
                </Reveal>

                {/* Timeline — single left-aligned column on mobile, alternating on desktop */}
                <div className="relative">
                    {/* Vertical line — centered on desktop, left-aligned on mobile */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-leo-blue/20 -translate-x-1/2" />

                    <div className="space-y-12">
                        {events.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <Reveal key={index} delay={0.1 * index}>
                                    <div className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                        {/* Dot */}
                                        <div className="absolute left-6 md:left-1/2 top-2 w-4 h-4 bg-leo-gold rounded-full ring-4 ring-white dark:ring-background -translate-x-1/2 z-10 shrink-0" />

                                        {/* Year badge — mobile: right of dot  |  desktop: opposite side */}
                                        <div className={`hidden md:flex md:w-1/2 items-start pt-1 ${isEven ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                                            <span className="text-4xl font-bold text-leo-blue/20 select-none">{event.year}</span>
                                        </div>

                                        {/* Content card */}
                                        <div className={`pl-14 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                                            <span className="md:hidden text-2xl font-bold text-leo-blue/20 block mb-1">{event.year}</span>
                                            <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                                <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
