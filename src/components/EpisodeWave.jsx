"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import React, { useEffect } from "react";

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

const EpisodeWave = () => {
    return (
        <section className="flex justify-center items-center relative sm:px-10 px-5">
            <div className='container mx-auto hidden md:flex items-center justify-center gap-5 md:gap-6 lg:gap-9'>
                <VoiceBar height={100} backgroundColor="#CD652E" />
                <VoiceBar height={180} backgroundColor="#EA834C" />

                <div className="w-172 flex flex-col justify-evenly border-[3px] p-8 border-[#F36B2140] rounded-[50px]">
                    <h4 className="heading-4 text-white text-center">
                        Get Episode Highlights <br className="lg:flex hidden" /> in Your Inbox
                    </h4>

                    <p className="body-2 text-[#E8E8E8] mt-3 font-light text-center">
                        Join our newsletter for exclusive insights and behind-the-scenes content.
                    </p>

                    <div className="mt-6 relative w-full max-w-100 mx-auto">
                        <input type="email" placeholder="Enter your email address" className={`w-full rounded-full 
                            border border-[#FFFFFF5E] px-6 pr-12 py-4 body-2 text-[#E8E8E8] outline-none`}
                        />

                        <span className={`absolute right-6 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center 
                            justify-center rounded-full`}
                        >
                            <img src="/logo/email-icon.svg" alt="Email Icon" className="w-max" />
                        </span>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <button className={`inline-flex flex-nowrap items-center gap-4 rounded-full cta-1
                            justify-center whitespace-nowrap bg-[#F36B21] text-white py-3 pl-6 pr-3`}
                        >
                            <span className="whitespace-nowrap">Subscribe Now</span>
                            <img src='/logo/subscribe.svg' alt="Button" className="h-auto w-max shrink-0" />
                        </button>
                    </div>
                </div>

                <VoiceBar height={230} backgroundColor="#E9A986" />
                <VoiceBar height={180} backgroundColor="#EA834C" />
                <VoiceBar height={270} backgroundColor="#F36B21" />
                <VoiceBar height={180} backgroundColor="#FDBD98" />
                <VoiceBar height={100} backgroundColor="#EA834C" />
            </div>

            <div className='container mx-auto md:hidden flex flex-col items-center justify-center gap-5'>
                <div className="flex flex-col items-center justify-center gap-5">
                    <VoiceBarHorizontal width={170} backgroundColor="#EA834C" />
                    <VoiceBarHorizontal width={210} backgroundColor="#F36B21" />
                    <VoiceBarHorizontal width={260} backgroundColor="#E9A986" />
                </div>

                <div className="flex flex-col justify-evenly border-[3px] p-6 border-[#F36B2140] rounded-[50px]">
                    <h4 className="heading-4 text-white text-center">
                        Get Episode Highlights <br className="lg:flex hidden" /> in Your Inbox
                    </h4>

                    <p className="body-2 text-[#E8E8E8] mt-3 font-light text-center">
                        Join our newsletter for exclusive insights and behind-the-scenes content.
                    </p>

                    <div className="mt-6 relative w-full max-w-100 mx-auto">
                        <input type="email" placeholder="Enter your Email-Id" className={`w-full rounded-full 
                            border border-[#FFFFFF5E] px-6 pr-12 py-4 body-2 text-[#E8E8E8] outline-none`}
                        />

                        <span className={`absolute right-6 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center 
                            justify-center rounded-full`}
                        >
                            <img src="/logo/email-icon.svg" alt="Email Icon" className="w-max" />
                        </span>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <button className={`inline-flex flex-nowrap items-center gap-4 rounded-full cta-1
                            justify-center whitespace-nowrap bg-[#F36B21] text-white py-3 pl-6 pr-3`}
                        >
                            <span className="whitespace-nowrap">Subscribe Now</span>
                            <img src='/logo/subscribe.svg' alt="Button" className="h-auto w-max shrink-0" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-5">
                    <VoiceBarHorizontal width={260} backgroundColor="#EA834C" />
                    <VoiceBarHorizontal width={210} backgroundColor="#F36B21" />
                    <VoiceBarHorizontal width={170} backgroundColor="#E9A986" />
                </div>
            </div>
        </section>
    )
}

export default EpisodeWave