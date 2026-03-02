"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import Link from "next/link";

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
                    <Link href="https://www.linkedin.com/in/anupamsatyasheel/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/anupam-satyasheel.png" className="xl:w-max lg:w-50 h-auto"
                            alt="Anupam Satyasheel"
                        />
                    </Link>

                    <VoiceBar height={300} backgroundColor="#EA834C" />
                    <VoiceBar height={240} backgroundColor="#E9A986" />

                    <Link href="https://www.linkedin.com/in/thekingconsulting/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/devid-king.png" className="lg:w-50 xl:w-max h-auto"
                            alt="Devid King"
                        />
                    </Link>

                    <VoiceBar height={240} backgroundColor="#E9A986" />
                    <VoiceBar height={300} backgroundColor="#EA834C" />

                    <Link href="https://www.linkedin.com/in/sonitin-aggarwal/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/nitin-agrawal.png" className="lg:w-50 xl:w-max h-auto"
                            alt="Nitin Agrawal"
                        />
                    </Link>
                </div>

                <div className="w-full container mx-auto lg:hidden flex flex-col items-center justify-center gap-10">
                    <Link href="https://www.linkedin.com/in/anupamsatyasheel/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/anupam-satyasheel.png" className=" h-auto"
                            alt="Anupam Satyasheel"
                        />
                    </Link>

                    <div className="flex items-center justify-center gap-5">
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                    </div>

                    <Link href="https://www.linkedin.com/in/thekingconsulting/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/devid-king.png" className="lg:w-50 xl:w-max h-auto"
                            alt="Devid King"
                        />
                    </Link>

                    <div className="flex items-center justify-center gap-5">
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={210} backgroundColor="#D67541" />
                        <VoiceBarHorizontal height={150} backgroundColor="#E9A986" />
                    </div>

                    <Link href="https://www.linkedin.com/in/sonitin-aggarwal/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/nitin-agrawal.png" className="lg:w-50 xl:w-max h-auto"
                            alt="Nitin Agrawal"
                        />
                    </Link>
                </div>
            </section>
        </Fragment>
    )
}

export default TeamWave