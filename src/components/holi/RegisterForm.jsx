import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle, Sparkles } from "lucide-react";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const onSubmit = async (data) => {
        console.log("=== FORM SUBMISSION STARTED ===");
        console.log("Form Data:", data);

        setLoading(true);
        setServerError("");

        // Build full object matching your entity
        const payload = {
            category: "Student",
            gender: "Male",
            dob: "2003-05-14",
            university: "XYZ University",
            department: "Computer Science",
            year: "3rd Year",
            rollNo: "TEMP123",

            whatsapp: data.phone,
            city: "Jaipur",
            district: "Jaipur",

            participationType: "Solo",
            tshirtSize: "L",
            foodPreference: "Veg",

            emergencyName: "Emergency Contact",
            emergencyPhone: "9999999999",

            reason: "Registered from website",
            source: "Website",
            terms: true,

            // user input fields
            fullName: data.fullName,
            college: data.college,
            email: data.email,
            phone: data.phone,
        };

        console.log("Sending Payload:", JSON.stringify(payload, null, 2));

        try {
            console.log("Making POST request to: http://localhost:8080/form");

            const response = await fetch("http://localhost:8080/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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

            setSuccess(true);
            reset();
        } catch (error) {
            console.error("=== FETCH ERROR ===");
            console.error("Error Type:", error.name);
            console.error("Error Message:", error.message);
            console.error("Full Error:", error);

            if (error.message.includes("Failed to fetch")) {
                setServerError("Cannot connect to server. Make sure Spring Boot is running on port 8080.");
            } else {
                setServerError(`Failed to submit: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center p-10">
                <div className="text-green-500 text-6xl mb-4">
                    <CheckCircle size={60} />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                    Registration Successful!
                </h2>
                <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg"
                >
                    Register Another
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Register Now
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <input
                        {...register("fullName", { required: "Full name required" })}
                        placeholder="Full Name"
                        className="w-full border p-3 rounded"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        {...register("college", { required: "College required" })}
                        placeholder="College"
                        className="w-full border p-3 rounded"
                    />
                    {errors.college && (
                        <p className="text-red-500 text-sm">
                            {errors.college.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        {...register("email", { required: "Email required" })}
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="tel"
                        {...register("phone", { required: "Phone required" })}
                        placeholder="Phone"
                        className="w-full border p-3 rounded"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {serverError && (
                    <p className="text-red-600 text-center">
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        <>
                            Register <Sparkles size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
