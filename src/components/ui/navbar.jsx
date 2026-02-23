import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PawPrint, Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../hooks/use-theme";

const Navbar = ({ darkText = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "About", href: "#about" },
        { name: "Mission", href: "#mission" },
        { name: "Activities", href: "#activities" },
        { name: "Join Us", href: "#membership" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled
                    ? (darkText ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "glass py-2")
                    : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <img
                        src="/Leo_clubs_logo.svg.png"
                        alt="Leo Club Logo"
                        className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-xl md:text-2xl font-bold leading-none tracking-tight",
                            darkText ? "text-blue-900" : "text-white"
                        )}>
                            LEO CLUB
                        </span>
                        <span className={cn(
                            "text-[0.65rem] md:text-xs font-medium tracking-widest uppercase opacity-90",
                            darkText ? "text-yellow-600" : "text-yellow-400"
                        )}>
                            Coimbatore
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "transition-colors font-medium text-sm tracking-wide relative group",
                                darkText ? "text-slate-700 hover:text-leo-blue" : "text-white/80 hover:text-leo-gold"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300",
                                darkText ? "bg-leo-blue" : "bg-leo-gold"
                            )} />
                        </a>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            darkText ? "hover:bg-slate-200 text-slate-700" : "hover:bg-white/10 text-white"
                        )}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-leo-gold to-leo-yellow text-leo-blue font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        Donate
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn("md:hidden", darkText ? "text-slate-900" : "text-white")}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                            "md:hidden backdrop-blur-md overflow-hidden absolute top-full left-0 right-0 border-t",
                            darkText ? "bg-white/95 border-slate-200" : "bg-leo-blue/95 border-white/10"
                        )}
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-lg font-medium",
                                        darkText ? "text-slate-800 hover:text-leo-blue" : "text-white/80 hover:text-leo-gold"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                                className={cn(
                                    "flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2",
                                    darkText ? "bg-slate-100 text-slate-900" : "bg-white/10 text-white"
                                )}
                            >
                                {theme === 'dark' ? <><Sun className="w-5 h-5" /> Light Mode</> : <><Moon className="w-5 h-5" /> Dark Mode</>}
                            </button>
                            <button className="w-full py-3 bg-gradient-to-r from-leo-gold to-leo-yellow text-leo-blue font-bold rounded-xl shadow-lg">
                                Donate Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
