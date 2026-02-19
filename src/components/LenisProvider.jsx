"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisProvider = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
        });

        let rafId = 0;

        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return children;
};

export default LenisProvider;
