import React, { useEffect, useRef, memo } from 'react';

// Uses refs + direct DOM manipulation instead of useState to avoid
// re-rendering the entire component on every mouse move event
export const CustomCursor = memo(() => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const el = cursorRef.current;
        if (!el) return;

        el.style.display = 'block';

        const onMouseMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const render = () => {
            if (el) {
                el.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
            }
            rafId.current = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        rafId.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block border border-leo-blue/30 bg-leo-blue/10 backdrop-blur-sm"
            style={{ display: 'none', willChange: 'transform' }}
            aria-hidden="true"
        />
    );
});

CustomCursor.displayName = 'CustomCursor';
