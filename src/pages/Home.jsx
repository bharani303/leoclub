import React, { useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { ScrollProgress } from '../components/ui/scroll-progress';
import { CustomCursor } from '../components/ui/custom-cursor';
import BackgroundBlobs from '../components/ui/background-blobs';

// Sections
import Hero from '../sections/hero';
import About from '../sections/about';
import Mission from '../sections/mission';
import Activities from '../sections/activities';
import Organization from '../sections/organization';
import Membership from '../sections/membership';
import Testimonials from '../sections/testimonials';
import Timeline from '../sections/timeline';
import Gallery from '../sections/gallery';
import Contact from '../sections/contact';
import { Reveal } from '../components/ui/reveal';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-leo-gold selection:text-leo-blue">
            <ScrollProgress />
            <CustomCursor />
            <BackgroundBlobs />

            <Navbar />

            <main>
                <Hero />

                {/* Holi CTA Section - Corporate Light Style */}
                <section className="relative py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-slate-50 to-slate-50" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                Registration Open
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                HOLI UTSAV <span className="text-yellow-600">2026</span>
                            </h2>
                            <p className="text-xl text-slate-600 max-w-xl font-light leading-relaxed">
                                Verify your college ID and register your team for the biggest inter-college colour festival of Coimbatore.
                            </p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <Link to="/holi-2026">
                                <button className="group relative px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 font-bold text-lg rounded-lg shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300">
                                    <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                        College Registration Open <Sparkles className="w-5 h-5" />
                                    </span>
                                </button>
                            </Link>
                        </Reveal>
                    </div>
                </section>

                <Organization />
                <About />
                <Mission />
                <Activities />
                <Timeline />
                <Membership />
                <Testimonials />
                <Gallery />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
