import React, { useState, memo } from 'react';
import { Reveal } from '../components/ui/reveal';
import { motion } from 'framer-motion';
import { Droplets, Crown, Star } from 'lucide-react';

// ─── Board Member Data (from Google Sheets) ────────────────────────────────
// To add a Google Drive photo: set image to the direct file URL:
// `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`
const boardMembers = [
    {
        name: "Durga S",
        role: "Leo President",
        portfolio: "Leo President of HICAS",
        bloodGroup: "AB-",
        isLeader: true,
        rank: 1,
        image: "https://lh3.googleusercontent.com/d/17wmDHhdpNHTNFSjkuSQBxQwKJdPElNst",
        gradient: "from-leo-blue via-blue-700 to-blue-900",
    },
    {
        name: "Sumitha P",
        role: "Leo Vice President",
        portfolio: "Leo Vice President of HICAS",
        bloodGroup: "B+",
        isLeader: true,
        rank: 2,
        image: "https://lh3.googleusercontent.com/d/1KLJxtvL36yX299x1Vq_ApV25DJhN3Vte",
        gradient: "from-indigo-600 via-indigo-700 to-leo-blue",
    },
    {
        name: "Gowdham",
        role: "Leo Treasurer",
        portfolio: "Leo Treasurer of HICAS",
        bloodGroup: "A+",
        rank: 3,
        image: "https://lh3.googleusercontent.com/d/1aeL80zMWVm0FO15PMDfnZAzlUAZARY0N",
        gradient: "from-amber-500 via-yellow-600 to-amber-700",
    },
    {
        name: "Marutha Muthu Selvam M",
        role: "Joint Secretary",
        portfolio: "Leo Joint Secretary of HICAS",
        bloodGroup: "O+",
        rank: 4,
        image: "https://lh3.googleusercontent.com/d/18yy80ElK3aCvzt8wK1xv7u50oG_QuOEG",
        gradient: "from-teal-600 via-teal-700 to-emerald-800",
    },
    {
        name: "Aadhill H",
        role: "Sergeant at Arms",
        portfolio: "Leo Sergeant at Arms of HICAS",
        bloodGroup: "A+",
        rank: 5,
        image: "https://lh3.googleusercontent.com/d/190oehUBCbOqtB2FV_CtNGNl0YPCSqp8G",
        gradient: "from-slate-600 via-slate-700 to-slate-800",
    },
    {
        name: "Srividhya E",
        role: "Community Service Chair",
        portfolio: "Leo Community Service Chair",
        bloodGroup: "B+",
        rank: 6,
        image: "https://lh3.googleusercontent.com/d/1aAJ_d-H9x2Cbta5p2Xsvaw17zdcnA0vH",
        gradient: "from-rose-500 via-rose-600 to-red-700",
    },
    {
        name: "Arjun Jiith V",
        role: "Community Service Director",
        portfolio: "Leo Community Service Director",
        bloodGroup: "B+",
        rank: 7,
        image: "https://lh3.googleusercontent.com/d/1J53TFYoN3RVCzCPzPrESVs1s72NL1Xbz",
        gradient: "from-orange-500 via-orange-600 to-red-600",
    },
    {
        name: "Logesh G",
        role: "Membership Director",
        portfolio: "Leo Membership Director",
        bloodGroup: "B+",
        rank: 8,
        image: "https://lh3.googleusercontent.com/d/153sLIrlsXaaoeSV33yaiDJhT--7ocpR0",
        gradient: "from-cyan-600 via-cyan-700 to-blue-700",
    },
    {
        name: "Bharanidharan S",
        role: "International Relation Chairman",
        portfolio: "Leo International Relation Chairman",
        bloodGroup: "O+",
        rank: 9,
        image: "https://lh3.googleusercontent.com/d/16gXiWwcsUfUBzVOVQy35qCt6GyiKkk2Y",
        gradient: "from-violet-600 via-violet-700 to-purple-800",
    },
    {
        name: "Danya MS",
        role: "International Relations Officer",
        portfolio: "Leo International Relations Officer",
        bloodGroup: "A+",
        rank: 10,
        image: "https://lh3.googleusercontent.com/d/1HJdKfs0lM-aAXbiTUWe8vuGmaQV2MZ0m",
        gradient: "from-fuchsia-600 via-fuchsia-700 to-purple-700",
    },
    {
        name: "Melvin Antony S",
        role: "IT / Tech Coordinator",
        portfolio: "Leo IT/Tech Coordinator",
        bloodGroup: "B+",
        rank: 11,
        image: "https://lh3.googleusercontent.com/d/1E3kNhd8_X0wozqr54q_M6SoD1RyqIb-F",
        gradient: "from-sky-500 via-sky-600 to-blue-700",
    },
    {
        name: "Jenisha Raj Mol J",
        role: "Project Coordinator",
        portfolio: "Leo Project Coordinator of HICAS",
        bloodGroup: "A+",
        rank: 12,
        image: "https://lh3.googleusercontent.com/d/1pIDd1sa94c88V0ukrMoK0feFwMIXtf5K",
        gradient: "from-pink-500 via-pink-600 to-rose-700",
    },
    {
        name: "Madhumithaa S",
        role: "Fund Raising Chairman",
        portfolio: "Leo Fund Raising Chairman",
        bloodGroup: "A1B+",
        rank: 13,
        image: "https://lh3.googleusercontent.com/d/1Enwji_fF62bvi6u3MT21gD2HV7sTeZi0",
        gradient: "from-green-600 via-emerald-600 to-teal-700",
    },
    {
        name: "Akshaya Bharathi",
        role: "Blood Donor Cell",
        portfolio: "Leo Blood Donor Cell",
        bloodGroup: "O+",
        rank: 14,
        image: "https://lh3.googleusercontent.com/d/1mPTkUCN-1K2ON7-DxZE605_1aSwGZhDY",
        gradient: "from-red-500 via-red-600 to-rose-700",
    },
];

// ─── Initials Avatar ───────────────────────────────────────────────────────
const InitialsAvatar = ({ name, gradient }) => {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join('');

    return (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white text-3xl font-bold tracking-wider select-none">{initials}</span>
        </div>
    );
};

// ─── Single Member Card ────────────────────────────────────────────────────
const MemberCard = memo(({ member, index }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.06 * (index % 6), ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="group relative bg-white dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-border transition-shadow duration-300 flex flex-col"
        >
            {/* Top: Photo / Avatar */}
            <div className="relative h-52 overflow-hidden">
                {member.image && !imgError ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <InitialsAvatar name={member.name} gradient={member.gradient} />
                )}

                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Blood Group Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full shadow">
                    <Droplets className="w-3 h-3" />
                    {member.bloodGroup}
                </div>

                {/* Leader crown badge */}
                {member.isLeader && (
                    <div className="absolute top-3 left-3 bg-leo-gold text-leo-blue text-xs font-bold px-2 py-1 rounded-full shadow flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        {member.rank === 1 ? 'President' : 'Vice President'}
                    </div>
                )}

                {/* Rank number at bottom left of image */}
                <div className="absolute bottom-3 left-3">
                    <span className="text-white/60 text-xs font-mono">#{String(member.rank).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Bottom: Info */}
            <div className="p-5 flex flex-col flex-1">
                {/* Colored role bar */}
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${member.gradient} mb-3 group-hover:w-20 transition-all duration-300`} />

                <h3 className="font-bold text-base text-foreground leading-tight mb-1">
                    {member.name}
                </h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.role}
                </p>
            </div>
        </motion.div>
    );
});

MemberCard.displayName = 'MemberCard';

// ─── Board Members Section ──────────────────────────────────────────────────
const BoardMembers = () => {
    return (
        <section id="board" className="py-24 bg-gradient-to-br from-background via-leo-blue/5 to-background relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-leo-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-leo-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <Reveal>
                    <div className="text-center mb-16 w-full">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leo-blue/10 border border-leo-blue/20 text-leo-blue text-xs font-bold uppercase tracking-widest mb-5">
                            <Star className="w-3.5 h-3.5" />
                            HICAS Leo Club — District 324 1D
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Meet Our <span className="text-leo-gold">Board</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            The passionate team of young leaders driving service and change across District 324 1D, Tamil Nadu.
                        </p>
                    </div>
                </Reveal>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {boardMembers.map((member, index) => (
                        <MemberCard key={member.rank} member={member} index={index} />
                    ))}
                </div>

                {/* Bottom note */}
                <Reveal delay={0.3}>
                    <p className="text-center text-muted-foreground text-sm mt-12">
                        🦁 President's term: 2024–25 · Lions International District 324 1D
                    </p>
                </Reveal>
            </div>
        </section>
    );
};

export default BoardMembers;
