"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import React, { Fragment, useEffect } from "react";

function VoiceBar({ height, backgroundColor, className = "", speed = 500 }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(scale, 0.75 + Math.random() * 0.55, {
                duration: 0.6, ease: "easeInOut",
            });
        }, speed);

        return () => clearInterval(loop);
    }, [scale, speed]);

    return (
        <motion.div className={`lg:w-15.25 md:w-14 w-5 rounded-full ${className}`} style={{
            height: height, backgroundColor: backgroundColor,
            scaleY: scale, transformOrigin: "center",
        }} />
    );
}

function VoiceBarHorizontal({ width, backgroundColor, speed = 500, className = "" }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(scale, 0.75 + Math.random() * 0.55, { duration: 0.6, ease: "easeInOut" });
        }, speed);
        return () => clearInterval(loop);
    }, [scale, speed]);

    return (
        <motion.div className={`h-10 rounded-full shrink-0 ${className}`} style={{
            width: width, backgroundColor,
            scaleX: scale, transformOrigin: "center",
        }} />
    );
}

function VoicePill({ height, backgroundColor, label, title, className = "" }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(
                scale, 0.92 + Math.random() * 0.15,
                { duration: 0.7, ease: "easeInOut" }
            );
        }, 1000 + Math.random() * 400);

        return () => clearInterval(loop);
    }, [scale]);

    return (
        <motion.div className={`rounded-full flex flex-col items-center py-16 px-4 justify-center ${className}`}
            style={{
                height: height, backgroundColor: backgroundColor,
                scaleY: scale, transformOrigin: "center",
            }}
        >
            <h2 className="heading-2 text-white">{label}</h2>
            <h6 className="heading-6 text-white">{title}</h6>
        </motion.div>
    );
}

function VoicePillHorizontal({ width, backgroundColor, label, title, className = "" }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(
                scale, 0.92 + Math.random() * 0.15,
                { duration: 0.7, ease: "easeInOut" }
            );
        }, 1000 + Math.random() * 400);

        return () => clearInterval(loop);
    }, [scale]);

    return (
        <motion.div className={`rounded-full flex flex-col items-center py-4 px-4 justify-center ${className}`}
            style={{
                backgroundColor: backgroundColor,
                scaleX: scale, transformOrigin: "center",
            }}
        >
            <h2 className="heading-2 text-white">{label}</h2>
            <h6 className="heading-6 text-white">{title}</h6>
        </motion.div>
    );
}

const Highlights = () => {
    return (
        <Fragment>
            <section style={{ backgroundImage: `url(/images/highlights-bg.svg)` }} className={`bg-cover bg-center
                h-[80vh] justify-center items-center relative sm:px-10 px-5 hidden md:flex`}
            >
                <div className='container mx-auto flex items-center justify-center gap-5 md:gap-6 lg:gap-9'>
                    <VoiceBar height={111} backgroundColor="#CD652E" />
                    <VoicePill height={400} backgroundColor="#FDBD98" label="50+"
                        title="Episodes" className="md:w-49 w-32"
                    />

                    <VoiceBar height={200} backgroundColor="#EA834C" />
                    <VoicePill height={300} backgroundColor="#F49B69" label="10K+"
                        title="Listeners" className="md:w-49.25 w-32.25"
                    />

                    <VoiceBar height={300} backgroundColor="#BF6432" />
                    <VoicePill height={370} backgroundColor="#F36B21" label="4.9"
                        title="Rating" className="md:w-48.5 w-31.5"
                    />

                    <VoiceBar height={285} backgroundColor="#D67541" />
                    <VoiceBar height={200} backgroundColor="#E9A986" />
                    <VoiceBar height={200} backgroundColor="#CE7342" />
                    <VoiceBar height={111} backgroundColor="#C27951" />
                </div>
            </section>

            <section className="linear-background spacing md:hidden flex justify-center items-center relative sm:px-10 px-5">
                <div className='container mx-auto flex flex-col items-center justify-center gap-5 md:gap-6 lg:gap-9'>
                    <VoiceBarHorizontal width={100} backgroundColor="#CD652E" />
                    <VoicePillHorizontal backgroundColor="#FDBD98" label="50+"
                        title="Episodes" className="w-65"
                    />

                    <VoiceBarHorizontal width={170} backgroundColor="#EA834C" />
                    <VoicePillHorizontal backgroundColor="#F49B69" label="10K+"
                        title="Listeners" className="w-65.25"
                    />

                    <VoiceBarHorizontal width={230} backgroundColor="#BF6432" />
                    <VoicePillHorizontal backgroundColor="#F36B21" label="4.9"
                        title="Rating" className="w-64.5"
                    />

                    <VoiceBarHorizontal width={260} backgroundColor="#D67541" />
                    <VoiceBarHorizontal width={170} backgroundColor="#E9A986" />
                    <VoiceBarHorizontal width={100} backgroundColor="#C27951" />
                </div>
            </section>
        </Fragment>
    )
}

export default Highlights