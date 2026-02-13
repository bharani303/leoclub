import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Trash2, Users, IndianRupee, School, Briefcase, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [stats, setStats] = useState({ total: 0, students: 0, professionals: 0, others: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await db.getAllRegistrations();
        const statsData = await db.getStats();
        setRegistrations(data.reverse()); // Newest first
        setStats(statsData);
        setLoading(false);
    };

    const handleClear = () => {
        if (window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
            db.clearDatabase();
            loadData();
        }
    };

    const downloadCSV = () => {
        const headers = ["ID", "Name", "Category", "Gender", "Phone", "Email", "College/Org", "Time"];
        const rows = registrations.map(reg => [
            reg.id,
            reg.fullName,
            reg.category,
            reg.gender,
            reg.phone,
            reg.email,
            reg.category === 'Student' ? reg.college : (reg.organization || '-'),
            new Date(reg.timestamp).toLocaleString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "holi_registrations.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Link to="/holi-2026" className="text-white/50 hover:text-white flex items-center gap-2 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Event Page
                        </Link>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-holi-neon-pink to-holi-neon-blue bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-white/60">Holi Utsav 2026 Registration Data</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/10">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <button onClick={handleClear} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all border border-red-500/20">
                            <Trash2 className="w-4 h-4" /> Clear Data
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatCard icon={Users} label="Total Registrations" value={stats.total} color="text-white" bg="bg-white/5" />
                    <StatCard icon={School} label="Students" value={stats.students} color="text-holi-neon-pink" bg="bg-holi-neon-pink/10" />
                    <StatCard icon={Briefcase} label="Professionals" value={stats.professionals} color="text-holi-neon-blue" bg="bg-holi-neon-blue/10" />
                    <StatCard icon={User} label="Others/Family" value={stats.others} color="text-holi-neon-yellow" bg="bg-holi-neon-yellow/10" />
                    <StatCard icon={IndianRupee} label="Est. Revenue" value={`₹${stats.revenue.toLocaleString()}`} color="text-green-400" bg="bg-green-400/10" />
                </div>

                {/* Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {loading ? (
                        <div className="p-10 text-center text-white/50">Loading data...</div>
                    ) : registrations.length === 0 ? (
                        <div className="p-10 text-center text-white/50">No registrations found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5 text-white/70 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Category</th>
                                        <th className="p-4 font-semibold">Contact</th>
                                        <th className="p-4 font-semibold">Details</th>
                                        <th className="p-4 font-semibold">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium">
                                                <div className="text-white">{reg.fullName}</div>
                                                <div className="text-white/40 text-xs">{reg.gender}, {reg.age}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-semibold
                                                    ${reg.category === 'Student' ? 'bg-holi-neon-pink/20 text-holi-neon-pink' :
                                                        reg.category === 'Professional' ? 'bg-holi-neon-blue/20 text-holi-neon-blue' :
                                                            'bg-white/10 text-white'}
                                                `}>
                                                    {reg.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-white/80">
                                                <div>{reg.phone}</div>
                                                <div className="text-white/40 text-xs">{reg.email}</div>
                                            </td>
                                            <td className="p-4 text-white/80">
                                                {reg.category === 'Student' ? (
                                                    <div>
                                                        <div>{reg.college}</div>
                                                        <div className="text-white/40 text-xs">{reg.department}</div>
                                                    </div>
                                                ) : (
                                                    <div>{reg.organization || '-'}</div>
                                                )}
                                            </td>
                                            <td className="p-4 text-white/50 text-xs whitespace-nowrap">
                                                {new Date(reg.timestamp).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border border-white/5 ${bg}`}
    >
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-white/60 text-sm font-medium">{label}</span>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
            {value}
        </div>
    </motion.div>
);

export default AdminDashboard;
