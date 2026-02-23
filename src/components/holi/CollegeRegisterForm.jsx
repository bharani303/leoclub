import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, Sparkles, User, School, Phone, Mail, Users, AlertCircle } from 'lucide-react';
import Confetti from 'react-confetti';

// Zod Schema
const formSchema = z.object({
    category: z.enum(["Student", "Professional"]),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
    dob: z.string().min(1, "Date of Birth is required"),
    college: z.string().optional(),
    department: z.string().optional(),
    year: z.string().optional(),
    university: z.string().optional(),
    rollNo: z.string().optional(),
    organization: z.string().optional(),

    phone: z.string().regex(/^[0-9]{10}$/, "Invalid Phone Number (10 digits)"),
    whatsapp: z.string().regex(/^[0-9]{10}$/, "Invalid WhatsApp Number (10 digits)"),
    email: z.string().email("Invalid Email Address"),
    city: z.string().min(2, "City is required"),
    district: z.string().min(2, "District is required"),

    participationType: z.enum(["Individual", "Group"]),
    teamSize: z.string().optional(),
    tshirtSize: z.enum(["S", "M", "L", "XL", "XXL"]),
    foodPreference: z.enum(["Veg", "Non-Veg"]),
    emergencyName: z.string().min(2, "Emergency Contact Name is required"),
    emergencyPhone: z.string().regex(/^[0-9]{10}$/, "Invalid Phone (10 digits)"),

    reason: z.string().min(10, "Please tell us why you want to join (min 10 chars)"),
    source: z.string().min(1, "Please select how you heard about us"),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the Terms & Conditions" }),
    }),
});

// useWindowDimensions Hook (Local implementation)
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
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

const HoliRegistrationForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            participationType: "Individual",
            terms: false
        }
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const { width, height } = useWindowDimensions();
    const participationType = watch("participationType");
    const category = watch("category");

    const onSubmit = async (data) => {
        console.log("=== COLLEGE FORM SUBMISSION STARTED ===");
        console.log("Form Data Submitted:", data);

        try {
            console.log("Making POST request to: http://localhost:8080/form");
            console.log("Payload:", JSON.stringify(data, null, 2));

            // Send data to Spring Boot backend
            const response = await fetch('http://localhost:8080/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log("Response Status:", response.status);
            console.log("Response OK:", response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server Error Response:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const result = await response.text();
            console.log("Server Response:", result);
            console.log("=== REGISTRATION SUCCESSFUL ===");

            setIsSuccess(true);
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("=== SUBMISSION ERROR ===");
            console.error("Error Type:", error.name);
            console.error("Error Message:", error.message);
            console.error("Full Error:", error);

            if (error.message.includes("Failed to fetch")) {
                alert("Cannot connect to server. Make sure Spring Boot is running on port 8080.");
            } else {
                alert(`Registration failed: ${error.message}. Please try again.`);
            }
        }
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm hover:border-slate-400";
    const labelClasses = "text-sm font-bold text-slate-700 ml-1 flex items-center gap-1";
    const errorClasses = "text-red-600 text-xs ml-1 mt-1 font-bold flex items-center gap-1";

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 p-8 text-center max-w-2xl mx-auto shadow-2xl"
            >
                {/* Minimal Confetti or none? User said "No festival animations". Let's keep confetti but maybe less chaotic? Or remove? "No festival splash". Safe to remove for corporate. */}

                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 border border-blue-200">
                    <CheckCircle className="w-10 h-10 text-blue-900" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Confirmed</h2>
                <p className="text-lg text-slate-600 mb-8">
                    Thank you for registering for the <span className="text-blue-900 font-bold">Leo Club Holi Gathering 2026</span>.
                    <br />A confirmation email with your details has been sent.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-lg transition-all border border-slate-300"
                >
                    Register Another Participant
                </button>
            </motion.div>
        )
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto font-sans">
            {/* Clean Background - Removed blobs */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <img
                        src="/Leo_clubs_logo.svg.png"
                        alt="Leo Club Logo"
                        className="w-20 h-20 mx-auto mb-6 object-contain drop-shadow-sm"
                    />
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-800 mb-6 uppercase tracking-widest">
                        Official Registration
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Reserve Your Spot
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        Please fill out the details below to confirm your participation.
                        <br /><span className="text-sm text-slate-400">All fields marked with * are mandatory.</span>
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-yellow-500 to-blue-900" />

                    {/* 1. Personal Details */}
                    <motion.div variants={itemVariants} className="space-y-8 mb-12">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center"><User className="w-4 h-4" /></span>
                            Personal Information
                        </h3>

                        {/* Category Selection */}
                        <div>
                            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1 mb-3 justify-center">I am a... *</label>
                            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                                {["Student", "Professional"].map((cat) => (
                                    <label key={cat} className={`
                                        cursor-pointer border rounded-lg p-4 text-center transition-all font-semibold text-sm
                                        ${category === cat
                                            ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}
                                     `}>
                                        <input type="radio" value={cat} {...register("category")} className="hidden" />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                            {errors.category && <p className={`text-center ${errorClasses}`}><AlertCircle className="w-3 h-3" /> {errors.category.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-1 md:col-span-1">
                                <label className={labelClasses}>Full Name *</label>
                                <input {...register("fullName")} className={inputClasses} placeholder="Enter your full name" />
                                {errors.fullName && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>Gender *</label>
                                <select {...register("gender")} className={inputClasses}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.gender.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>Date of Birth *</label>
                                <input type="date" {...register("dob")} className={inputClasses} />
                                {errors.dob && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.dob.message}</p>}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Professional / Academic Information - CONDITIONAL */}
                    <AnimatePresence mode="wait">
                        {category === "Student" && (
                            <motion.div
                                key="student"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-8 mb-12 overflow-hidden"
                            >
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center"><School className="w-4 h-4" /></span>
                                    Academic Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2">
                                        <label className={labelClasses}>College Name *</label>
                                        <input {...register("college")} className={inputClasses} placeholder="Full College Name" />
                                        {errors.college && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.college.message}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses}>University</label>
                                        <input {...register("university")} className={inputClasses} placeholder="University Name" />
                                        {errors.university && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.university.message}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Department *</label>
                                        <input {...register("department")} className={inputClasses} placeholder="Department" />
                                        {errors.department && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.department.message}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Year of Study *</label>
                                        <select {...register("year")} className={inputClasses}>
                                            <option value="">Select Year</option>
                                            <option value="1st Year">1st Year</option>
                                            <option value="2nd Year">2nd Year</option>
                                            <option value="3rd Year">3rd Year</option>
                                            <option value="4th Year">4th Year</option>
                                            <option value="PG">PG</option>
                                        </select>
                                        {errors.year && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.year.message}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Register Number / ID *</label>
                                        <input {...register("rollNo")} className={inputClasses} placeholder="ID Number" />
                                        {errors.rollNo && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.rollNo.message}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {category === "Professional" && (
                            <motion.div
                                key="professional"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-8 mb-12 overflow-hidden"
                            >
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center"><School className="w-4 h-4" /></span>
                                    Professional Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>Company / Organization Name *</label>
                                        <input {...register("organization")} className={inputClasses} placeholder="Organization Name" />
                                        {errors.organization && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.organization.message}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3. Contact Details */}
                    <motion.div variants={itemVariants} className="space-y-8 mb-12">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center"><Phone className="w-4 h-4" /></span>
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Mobile Number *</label>
                                <input type="tel" {...register("phone")} className={inputClasses} placeholder="10-digit number" />
                                {errors.phone && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.phone.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>WhatsApp Number</label>
                                <input type="tel" {...register("whatsapp")} className={inputClasses} placeholder="For updates" />
                                {errors.whatsapp && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Email Address *</label>
                                <input type="email" {...register("email")} className={inputClasses} placeholder="email@address.com" />
                                {errors.email && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>City *</label>
                                <input {...register("city")} className={inputClasses} placeholder="City" />
                                {errors.city && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.city.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>District *</label>
                                <input {...register("district")} className={inputClasses} placeholder="District" />
                                {errors.district && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.district.message}</p>}
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Event Preferences */}
                    <motion.div variants={itemVariants} className="space-y-8 mb-12">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center"><Users className="w-4 h-4" /></span>
                            Preferences
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClasses}>Participation Type</label>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="Individual" {...register("participationType")} className="w-4 h-4 accent-blue-900" />
                                        <span className="text-slate-700 font-medium text-sm">Individual</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value="Group" {...register("participationType")} className="w-4 h-4 accent-blue-900" />
                                        <span className="text-slate-700 font-medium text-sm">Group</span>
                                    </label>
                                </div>
                            </div>

                            {participationType === "Group" && (
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Team Size</label>
                                    <input {...register("teamSize")} className={inputClasses} placeholder="Number of members" />
                                </div>
                            )}

                            <div>
                                <label className={labelClasses}>T-Shirt Size *</label>
                                <select {...register("tshirtSize")} className={inputClasses}>
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                {errors.tshirtSize && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.tshirtSize.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>Food Preference *</label>
                                <select {...register("foodPreference")} className={inputClasses}>
                                    <option value="">Select Meal</option>
                                    <option value="Veg">Vegetarian</option>
                                    <option value="Non-Veg">Non-Vegetarian</option>
                                </select>
                                {errors.foodPreference && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.foodPreference.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className={labelClasses}>Emergency Contact Name *</label>
                                <input {...register("emergencyName")} className={inputClasses} placeholder="Name" />
                                {errors.emergencyName && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.emergencyName.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>Emergency Contact Phone *</label>
                                <input type="tel" {...register("emergencyPhone")} className={inputClasses} placeholder="Phone" />
                                {errors.emergencyPhone && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.emergencyPhone.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className={labelClasses}>Purpose of Joining (Min 10 chars)</label>
                            <textarea {...register("reason")} rows="3" className={inputClasses} placeholder="Share your motivation..." />
                            {errors.reason && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.reason.message}</p>}
                        </div>

                        <div>
                            <label className={labelClasses}>Source</label>
                            <select {...register("source")} className={inputClasses}>
                                <option value="">Select Source</option>
                                <option value="Social Media">Social Media</option>
                                <option value="College Poster">College Poster</option>
                                <option value="Friends">Friends/Referral</option>
                                <option value="Leo Club Member">Leo Club Member</option>
                            </select>
                            {errors.source && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.source.message}</p>}
                        </div>
                    </motion.div>

                    {/* Terms and Submit */}
                    <motion.div variants={itemVariants} className="pt-6 border-t border-slate-100">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center mt-0.5">
                                <input type="checkbox" {...register("terms")} className="peer w-5 h-5 rounded border-slate-300 bg-white checked:bg-blue-900 focus:ring-blue-800 transition-all appearance-none border checked:border-blue-900 shadow-sm" />
                                <CheckCircle className="w-3 h-3 text-white absolute top-1 left-1 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-800 transition-colors">
                                I hereby declare that the information provided is true. I agree to abide by the <a href="#" className="text-blue-900 font-bold hover:underline">Terms & Conditions</a> of the Leo Club of Coimbatore.
                            </span>
                        </label>
                        {errors.terms && <p className={errorClasses}><AlertCircle className="w-3 h-3" /> {errors.terms.message}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <> <Loader2 className="w-5 h-5 animate-spin" /> Processing... </>
                                ) : (
                                    <> Confirm Registration <Sparkles className="w-5 h-5 text-yellow-400" /> </>
                                )}
                            </span>
                        </button>
                    </motion.div>
                </motion.div>
            </form>
        </div >
    );
};
export default HoliRegistrationForm;
