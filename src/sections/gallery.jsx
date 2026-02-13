import React from 'react';
import { Reveal } from '../components/ui/reveal';

import g1 from '../assets/gallery/g1.jpg';
import g2 from '../assets/gallery/g2.jpg';
import g3 from '../assets/gallery/g3.jpg';
import g4 from '../assets/gallery/g4.jpg';
import g5 from '../assets/gallery/g5.jpg';
import g6 from '../assets/gallery/g6.jpg';

const Gallery = () => {
    const images = [g1, g2, g3, g4, g5, g6];

    return (
        <section id="gallery" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="text-4xl font-bold mb-4">Our Gallery</h2>
                        <p className="text-muted-foreground">Capturing moments of service and joy.</p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer aspect-[4/3]">
                                <img
                                    src={src}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-all">View</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
