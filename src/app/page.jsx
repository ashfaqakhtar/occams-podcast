"use client";

import Link from "next/link";
import Image from "next/image";
import VideoSlider from "@/components/VideoSlider";
import StatsWave from "@/components/StatsWave";
import { Fragment } from "react";

const Home = () => {
    return (
        <Fragment>
            <section style={{ backgroundImage: `url(/images/hero-banner.webp)` }} className={`bg-cover bg-center h-screen
                flex justify-center items-center relative sm:px-10 px-5`}>
                <div className="container mx-auto h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:gap-8 gap-5">
                        <div className={`h-full flex flex-row justify-start lg:items-end items-start -mt-10 
                            lg:order-0 order-1`}>

                            <div className="w-max h-max rounded-full bg-white/10 backdrop-blur-[23.4px] px-10 pt-3 pb-4">
                                <small className="text-white">Listen on:</small>

                                <div className="flex gap-4 mt-1.5">
                                    <Link href="">
                                        <Image className="w-auto" src="/logo/spotify.svg" alt="Spotify"
                                            width={0} height={40} priority />
                                    </Link>

                                    <Link href="">
                                        <Image className="w-auto" src="/logo/youtube.svg" alt="youtube"
                                            width={0} height={40} priority />
                                    </Link>

                                </div>
                            </div>
                        </div>

                        <div className="flex lg:justify-center justify-end flex-col lg:order-1 order-0">
                            <small className="text-white font-inter text-[1.375rem] font-light leading-7.5">
                                A podcast by Powered Occams Digital
                            </small>

                            <h1 className={`py-4 text-white heading-1`}>
                                Inception to Infinity
                            </h1>

                            <p className="text-white font-inter text-lg font-light leading-7.5">
                                Strategic conversations with founders, CEOs, and industry builders, tracing how bold ideas
                                move from inception to lasting, real-world impact through decisive moments and hard-won
                                insight.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <VideoSlider />

            <StatsWave />
        </Fragment>
    );
}

export default Home