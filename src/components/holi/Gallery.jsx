import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Reveal } from '../ui/reveal';

import gallery1 from '../../assets/holi/gallery1.jpg';
import gallery2 from '../../assets/holi/gallery2.jpg';
import gallery3 from '../../assets/holi/gallery3.jpg';
import gallery4 from '../../assets/holi/gallery4.jpg';
import gallery5 from '../../assets/holi/gallery5.jpg';
import gallery6 from '../../assets/holi/gallery6.jpg';

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="py-24 relative bg-white border-t border-slate-200">
            {/* Clean, no background elements */}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-blue-900 font-bold tracking-widest uppercase mb-2 block text-sm">Past Events</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Gallery
                        </h2>
                        <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full" />
                    </div>
                </Reveal>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((src, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div
                                className="relative rounded-2xl overflow-hidden group cursor-zoom-in break-inside-avoid shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all border border-slate-200"
                                onClick={() => setSelectedImage(src)}
                            >
                                <img src={src} alt="Holi Moment" className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal (Keep Dark for focus) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-pink-500 transition-colors z-50">
                            <X className="w-10 h-10" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
