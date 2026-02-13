import React from 'react';
import { motion } from 'framer-motion';

const BackgroundBlobs = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <motion.div
                className="absolute top-0 -left-20 w-[600px] h-[600px] bg-leo-blue/20 rounded-full blur-[100px] mix-blend-multiply filter"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <motion.div
                className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-leo-gold/20 rounded-full blur-[100px] mix-blend-multiply filter"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-leo-royal/10 rounded-full blur-[120px] mix-blend-multiply filter"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
        </div>
    );
};

export default BackgroundBlobs;
