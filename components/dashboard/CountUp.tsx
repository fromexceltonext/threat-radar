"use client";

import { useEffect, useState } from "react";

type Props = {
    value: number;
    duration?: number;
};

export const CountUp = ({ value, duration = 1200 }: Props) => {
    const [display, setDisplay] = useState(0)
    
    useEffect(() => {
        let frame: number;
        const start = performance.now();

        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3); // fast start, smooth finish
            setDisplay(Math.round(value * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value, duration]);

    return<>{display.toLocaleString("en-US")}</>

};