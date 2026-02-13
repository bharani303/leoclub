import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Reveal } from '../components/ui/reveal';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-background via-leo-blue/5 to-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <Reveal>
                            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-lg text-muted-foreground mb-10">
                                Have questions about joining or want to collaborate on a project? We'd love to hear from you.
                            </p>
                        </Reveal>

                        <div className="space-y-8">
                            <Reveal delay={0.2}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-leo-gold/20 text-leo-gold rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                                        <p className="text-muted-foreground">123 Leo Club Street, Community Center<br />New York, NY 10001</p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-leo-blue/10 text-leo-blue rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Email Us</h3>
                                        <p className="text-muted-foreground">hello@leoclub.org</p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.4}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Call Us</h3>
                                        <p className="text-muted-foreground">+1 (234) 567-8900</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-border relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-leo-gold/10 rounded-full blur-3xl -z-10" />

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-leo-blue focus:ring-1 focus:ring-leo-blue outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-leo-blue focus:ring-1 focus:ring-leo-blue outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-leo-blue focus:ring-1 focus:ring-leo-blue outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-leo-blue focus:ring-1 focus:ring-leo-blue outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button className="w-full px-6 py-4 bg-leo-blue text-white font-bold rounded-xl hover:bg-leo-royal transition-all shadow-lg flex items-center justify-center gap-2 group">
                                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
