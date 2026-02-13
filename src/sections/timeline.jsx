import React from 'react';
import { Reveal } from '../components/ui/reveal';

const Timeline = () => {
    const events = [
        { year: "1957", title: "First Club Founded", description: "The first Leo Club was founded in Pennsylvania, USA, by the Abington Lions Club." },
        { year: "1967", title: "Official Adoption", description: "Lions Clubs International officially adopted the Leo Club Program." },
        { year: "1996", title: "100,000 Members", description: "The Leo movement grew to over 100,000 members worldwide." },
        { year: "2024", title: "Global Impact", description: "Today, there are over 7,200 clubs across 150+ countries serving millions." }
    ];

    return (
        <section id="history" className="py-24 bg-background">
            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
                </Reveal>

                <div className="relative border-l-2 border-leo-blue/20 ml-4 md:ml-auto md:mr-auto space-y-12">
                    {events.map((event, index) => (
                        <Reveal key={index} delay={0.1 * index} width="100%">
                            <div className="relative pl-8 md:pl-0">
                                {/* Dot */}
                                <div className="absolute top-0 left-[-5px] w-3 h-3 bg-leo-gold rounded-full ring-4 ring-white dark:ring-background" />

                                <div className={`md:flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Date for desktop - opposite side */}
                                    <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                                        <span className="text-4xl font-bold text-leo-blue/20">{event.year}</span>
                                    </div>

                                    {/* Content */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                        <span className="md:hidden text-2xl font-bold text-leo-blue/20 block mb-2">{event.year}</span>
                                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                        <p className="text-muted-foreground">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
