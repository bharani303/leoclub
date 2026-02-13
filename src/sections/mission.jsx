import React from 'react';
import { Target, Eye, Heart, Globe, Award } from 'lucide-react';
import { Reveal } from '../components/ui/reveal';

const Mission = () => {
    const cards = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To empower volunteers to serve their communities, meet humanitarian needs, encourage peace and promote international understanding through Lions clubs."
        },
        {
            icon: Eye,
            title: "Our Vision",
            description: "To be the global leader in community and humanitarian service. Taking action and serving others with dedication and passion."
        },
        {
            icon: Heart,
            title: "Core Values",
            description: "We are guided by the values of integrity, service, community, and excellence in all that we do."
        }
    ];

    return (
        <section id="mission" className="py-24 bg-gradient-to-br from-background to-leo-blue/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-leo-gold/5 blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Reveal>
                        <h2 className="text-4xl font-bold mb-4">Our Purpose</h2>
                        <p className="text-muted-foreground text-lg">
                            Driven by a commitment to service and leadership.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <Reveal key={index} delay={0.2 * index}>
                            <div className="group p-8 rounded-2xl bg-white dark:bg-card border border-border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-leo-gold/20 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                                <div className="w-14 h-14 bg-leo-blue rounded-xl flex items-center justify-center mb-6 shadow-md shadow-leo-blue/20 group-hover:bg-leo-gold group-hover:text-leo-blue transition-colors duration-300">
                                    <card.icon className="w-7 h-7 text-white group-hover:text-leo-blue transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-leo-blue transition-colors">{card.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
