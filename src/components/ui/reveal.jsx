import React, { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";

// Simplified Reveal: uses useInView directly (no useAnimation/useEffect overhead)
// memo prevents re-render when parent re-renders
export const Reveal = memo(({ children, width = "fit-content", delay = 0.25 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    );
});

Reveal.displayName = 'Reveal';
