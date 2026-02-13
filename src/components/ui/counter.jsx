import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export const Counter = ({ value, direction = "up", suffix = "" }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [isInView, motionValue, direction, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (value % 1 !== 0) { // float
                setDisplayValue(latest.toFixed(1));
            } else {
                setDisplayValue(Math.floor(latest));
            }
        });
        return () => springValue.clearListeners();
    }, [springValue, value]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
};
