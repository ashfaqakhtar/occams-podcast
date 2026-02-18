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
        <motion.div className={`lg:w-12.75 md:w-11 rounded-full ${className}`} style={{
            height: height, backgroundColor: backgroundColor,
            scaleY: scale, transformOrigin: "center",
        }} />
    );
}

function VoiceBarHorizontal({ height, backgroundColor, speed = 500, className = "" }) {
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
        <motion.div className={`lg:w-12.75 md:w-11 w-10 rounded-full ${className}`} style={{
            height: height, backgroundColor: backgroundColor,
            scaleY: scale, transformOrigin: "center",
        }} />
    );
}

const TeamWave = () => {
    return (
        <Fragment>
            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <h4 className="heading-4 text-white text-center">
                        Meet our leadership.
                    </h4>
                </div>
            </section>

            <section className="w-full flex justify-center items-center relative sm:px-10 px-5">
                <div className='container mx-auto hidden lg:flex items-center justify-center gap-9'>
                    <img src="/images/anupam-satyasheel.png" className="xl:w-max lg:w-50 h-auto"
                        alt="Anupam Satyasheel"
                    />

                    <VoiceBar height={300} backgroundColor="#EA834C" />
                    <VoiceBar height={240} backgroundColor="#E9A986" />

                    <img src="/images/devid-king.png" className="lg:w-50 xl:w-max h-auto"
                        alt="Devid King"
                    />

                    <VoiceBar height={240} backgroundColor="#E9A986" />
                    <VoiceBar height={300} backgroundColor="#EA834C" />

                    <img src="/images/nitin-agrawal.png" className="lg:w-50 xl:w-max h-auto"
                        alt="Nitin Agrawal"
                    />
                </div>

                <div className="w-full container mx-auto lg:hidden flex flex-col items-center justify-center gap-10">
                    <img src="/images/anupam-satyasheel.png" className=" h-auto"
                        alt="Anupam Satyasheel"
                    />

                    <div className="flex items-center justify-center gap-5">
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                    </div>

                    <img src="/images/devid-king.png" className="lg:w-50 xl:w-max h-auto"
                        alt="Devid King"
                    />

                    <div className="flex items-center justify-center gap-5">
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                    </div>

                    <img src="/images/nitin-agrawal.png" className="lg:w-50 xl:w-max h-auto"
                        alt="Nitin Agrawal"
                    />
                </div>
            </section>
        </Fragment>
    )
}

export default TeamWave