import React from 'react';
import { PawPrint, Facebook, Instagram, Twitter, Linkedin, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-leo-blue text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-leo-gold to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/Leo_clubs_logo.svg.png"
                                alt="Leo Club Logo"
                                className="w-16 h-16 object-contain bg-white/10 rounded-full p-1 backdrop-blur-sm"
                            />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white tracking-tight">LEO CLUB</span>
                                <span className="text-xs text-leo-gold font-medium uppercase tracking-widest">Coimbatore</span>
                            </div>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Empowering youth to serve their communities, develop leadership skills, and foster international understanding.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-leo-gold hover:text-leo-blue transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-leo-gold">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Activities', 'Events', 'Membership', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-leo-gold">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 text-leo-gold shrink-0 mt-1" />
                                <span>123 Leo Club Street,<br />Community Center, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <Phone className="w-5 h-5 text-leo-gold shrink-0" />
                                <span>+1 (234) 567-8900</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <Mail className="w-5 h-5 text-leo-gold shrink-0" />
                                <span>hello@leoclub.org</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-leo-gold">Newsletter</h3>
                        <p className="text-white/70 mb-4">Subscribe to get updates on our latest drives and events.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-leo-gold focus:ring-1 focus:ring-leo-gold outline-none transition-all"
                            />
                            <button className="w-full px-4 py-3 bg-leo-gold text-leo-blue font-bold rounded-lg hover:bg-leo-yellow transition-all flex items-center justify-center gap-2">
                                Subscribe <Heart className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm">
                        © 2024 Leo Club. All rights reserved. Sponsored by Lions Clubs International.
                    </p>
                    <div className="flex gap-6 text-white/50 text-sm">
                        <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
