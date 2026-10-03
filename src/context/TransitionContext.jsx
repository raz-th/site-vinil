"use client";

import React, { createContext, useContext, useRef, useLayoutEffect, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import VinylDisk from "@/components/Discuri/VinylDisk";

// This ensures the animation hooks run before the screen paints to prevent flashing
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TransitionContext = createContext({
    navigateTo: () => { },
    finishTransition: () => { },
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    // 1. Gives us manual control over the curtain without relying on React mounts
    const controls = useAnimation();

    // 2. We use refs to track state without causing accidental re-renders
    const isCustomNavigating = useRef(false);
    const isFirstMount = useRef(true);

    const navigateTo = async (href) => {
        if (href === pathname) return;

        isCustomNavigating.current = true;

        // Slide the curtain down and WAIT for it to finish
        await controls.start({
            y: "0%",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        });

        // Only change the route after the screen is fully black
        router.push(href);
    };

    const finishTransition = async () => {
        // Slide the curtain back up
        await controls.start({
            y: "-100%",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        });

        // Reset our tracker
        isCustomNavigating.current = false;
    };

    // 3. Listen for Back/Forward Button Presses
    useIsomorphicLayoutEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        // If the URL changed but we DID NOT click our custom TransitionLink...
        if (!isCustomNavigating.current) {
            // It means the user pressed Back or Forward!
            // We instantly snap the curtain down to hide the immediate page change
            controls.set({ y: "0%" });

            // We don't need to manually lift it here because the new page's 
            // <PageTransitionReady /> component will mount and automatically 
            // call finishTransition() to lift the curtain gracefully!
        }
    }, [pathname, controls]);

    return (
        <TransitionContext.Provider value={{ navigateTo, finishTransition }}>
            {children}

            <motion.div
                className="transition-overlay"
                initial={{ y: "-100%" }} // Hidden by default on first visit
                animate={controls}       // Controlled manually by our functions above
            >
                <VinylDisk spin={true} color='#eec99d' />
                <div className='loadingContent'>
                    <h1>Se încarcă...</h1>
                    <p>Vă rugăm să așteptați</p>
                    <div className="soundwave">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </motion.div>
        </TransitionContext.Provider>
    );
};