import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                leo: {
                    blue: "#092c4eff", // Royal Blue
                    gold: "#FFD700", // Gold
                    royal: "#494e81ff",
                    yellow: "#FFC107",
                },
                holi: {
                    pink: "#FF007F",
                    purple: "#9D00FF",
                    cyan: "#00E5FF",
                    yellow: "#FFFF00",
                    orange: "#FF5722",
                },
                neon: {
                    pink: "#ff1493",
                    yellow: "#ccff00",
                    blue: "#00f0ff",
                    purple: "#b026ff",
                },
                festival: {
                    red: "#E53935",
                    orange: "#FB8C00",
                    yellow: "#FFEB3B",
                    green: "#4CAF50",
                    blue: "#2196F3",
                    purple: "#9C27B0",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    "0%, 100%": { opacity: 1, transform: "scale(1)" },
                    "50%": { opacity: 0.8, transform: "scale(1.05)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "powder-burst": {
                    "0%": { transform: "scale(0) opacity(0)" },
                    "50%": { opacity: 1 },
                    "100%": { transform: "scale(1.5) opacity(0)" },
                }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin-slow": "spin-slow 12s linear infinite",
                "powder-burst": "powder-burst 1s ease-out forwards",
            }
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
};
