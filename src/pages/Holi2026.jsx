import React, { useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { ScrollProgress } from '../components/ui/scroll-progress';
import { CustomCursor } from '../components/ui/custom-cursor';
import HoliHero from '../components/holi/HoliHero';
import HoliRegistrationForm from '../components/holi/CollegeRegisterForm';
import Highlights from '../components/holi/Highlights';
import Gallery from '../components/holi/Gallery';
import Safety from '../components/holi/Safety';
import Sponsors from '../components/holi/Sponsors';
import { Reveal } from '../components/ui/reveal';

const Holi2026 = () => {

    // Add Holi theme class to body/html on mount
    useEffect(() => {
        document.documentElement.classList.add('holi-theme');
        return () => {
            document.documentElement.classList.remove('holi-theme');
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-500 selection:text-blue-950">
            <ScrollProgress />
            {/* CustomCursor removed for professional feel or kept minimal - User said "Clean Blue or remove". Keeping component but it might need style update later. */}
            <CustomCursor />

            <div className="relative z-10">
                <Navbar darkText={false} />

                <main>
                    <HoliHero />

                    <Highlights />

                    <Gallery />

                    <section id="register-form" className="py-24 relative overflow-hidden">
                        {/* Dynamic Background for Form Section */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-yellow-200/50 to-pink-200/50 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-glow" />

                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <Reveal>
                                <HoliRegistrationForm />
                            </Reveal>
                        </div>
                    </section>

                    <Safety />

                    <Sponsors />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Holi2026;
