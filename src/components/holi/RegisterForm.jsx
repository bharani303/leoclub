import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

// Simple hook for window size since we didn't install react-use, 
// but wait, react-confetti handles window size internally if not passed? 
// Actually usually it needs width/height props to cover screen.
// Let's implement a simple hook for standard practice.

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const { width, height } = useWindowDimensions();

    const onSubmit = async (data) => {
        // Simulate API call
        console.log("Form Data Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSuccess(true);
        reset();
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {isSuccess && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
                </div>
            )}

            {/* Form Container */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-holi-pink/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-holi-cyan/10 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2 text-white">Secure Your Spot</h2>
                    <p className="text-white/60">Fill in your details to register for the most colorful event of the year.</p>
                </div>

                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-500/10">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Registration Successful!</h3>
                        <p className="text-white/70 mb-8">
                            Thank you for registering. We have sent a confirmation email with your ticket details.
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-semibold"
                        >
                            Register Another Person
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Full Name *</label>
                                <input
                                    {...register("fullName", { required: "Full Name is required" })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white placeholder:text-white/30"
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <p className="text-red-400 text-xs ml-1">{errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">College/Organization *</label>
                                <input
                                    {...register("college", { required: "College is required" })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white placeholder:text-white/30"
                                    placeholder="PSG College of Technology"
                                />
                                {errors.college && <p className="text-red-400 text-xs ml-1">{errors.college.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Email Address *</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white placeholder:text-white/30"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    {...register("phone", { required: "Phone number is required" })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white placeholder:text-white/30"
                                    placeholder="+91 98765 43210"
                                />
                                {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Gender</label>
                                <select
                                    {...register("gender")}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white [&>option]:bg-gray-900"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-say">Prefer not to say</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Year of Study</label>
                                <select
                                    {...register("year")}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white [&>option]:bg-gray-900"
                                >
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                    <option value="PG">PG Student</option>
                                    <option value="Working">Working Professional</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 ml-1">Why do you want to join? (Optional)</label>
                            <textarea
                                {...register("reason")}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-holi-purple focus:ring-1 focus:ring-holi-purple outline-none transition-all text-white placeholder:text-white/30 resize-none"
                                placeholder="I love colors and meeting new people..."
                            />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("terms", { required: "You must accept the terms" })}
                                className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-holi-purple focus:ring-holi-purple"
                            />
                            <label htmlFor="terms" className="text-sm text-white/70">
                                I agree to the <a href="#" className="text-holi-cyan hover:underline">Terms & Conditions</a> and understand that registration is non-refundable.
                            </label>
                        </div>
                        {errors.terms && <p className="text-red-400 text-xs ml-1">{errors.terms.message}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-holi-pink via-holi-purple to-holi-cyan text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-holi-purple/50 transform hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    Register Now <Sparkles className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
