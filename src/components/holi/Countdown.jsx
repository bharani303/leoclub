import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl md:text-5xl font-bold text-white drop-shadow-md">
                        {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                    </span>
                </div>
                <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-blue-200 font-medium">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="flex justify-center flex-wrap">
            {timerComponents.length ? timerComponents : <span className="text-slate-900 font-bold text-xl">Time's up!</span>}
        </div>
    );
};

export default Countdown;
