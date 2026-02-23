import React, { memo } from 'react';

// Static blobs using CSS animations instead of Framer Motion
// This avoids JS-driven animation (much lighter on GPU/CPU)
const BackgroundBlobs = memo(() => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
            <div
                className="absolute top-0 -left-20 w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'rgba(0, 51, 102, 0.12)',
                    filter: 'blur(80px)',
                    animation: 'blobMove1 12s ease-in-out infinite alternate',
                    willChange: 'transform',
                }}
            />
            <div
                className="absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full"
                style={{
                    background: 'rgba(255, 215, 0, 0.10)',
                    filter: 'blur(80px)',
                    animation: 'blobMove2 14s ease-in-out infinite alternate',
                    willChange: 'transform',
                }}
            />
            <style>{`
                @keyframes blobMove1 {
                    from { transform: translate(0, 0) scale(1); }
                    to   { transform: translate(60px, 30px) scale(1.08); }
                }
                @keyframes blobMove2 {
                    from { transform: translate(0, 0) scale(1); }
                    to   { transform: translate(-60px, -30px) scale(1.1); }
                }
            `}</style>
        </div>
    );
});

BackgroundBlobs.displayName = 'BackgroundBlobs';
export default BackgroundBlobs;
