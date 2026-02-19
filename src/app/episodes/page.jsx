"use client";

import React, { Fragment, useRef, useState } from 'react'
import { motion } from "framer-motion";
import Playlist from '@/components/Playlist';

const Episodes = () => {
    const [activeTab, setActiveTab] = useState("all-episodes");
    const scrollerRef = useRef(null);
    const tabRefs = useRef({});

    const onTabClick = (id) => {
        setActiveTab(id);

        const element = tabRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    };

    const TABS = [
        { id: "all-episodes", label: "All Episodes" },
        { id: "leadership", label: "Leadership" },
        { id: "entrepreneurship", label: "Entrepreneurship" },
        { id: "transformation", label: "Transformation", },
        { id: "human-potentials", label: "Human Potentials" },
        { id: "community", label: "Community" },
    ];

    return (
        <Fragment>
            <section className="relative h-[90vh]">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/episodes-banner-desktop.webp)" }}
                        className="hidden md:block h-full bg-cover lg:bg-center md:bg-position-[90%] bg-position-[80%]"
                    />

                    <div className="block md:hidden h-full w-full bg-cover bg-bottom"
                        style={{ backgroundImage: "url(/images/episodes-banner-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h1 className="heading-1 text-white text-center">
                                Episodes
                            </h1>

                            <p className='body-2 text-[#E8E8E8] font-light mt-4 text-center lg:max-w-xl'>
                                Browse our complete collection of conversations with industry leaders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing relative z-20 -mt-60">
                    <div className="rounded-full bg-[#FFFFFF1C] backdrop-blur-xl pl-4 sm:pr-8 pr-5 py-3.5">
                        <div className="flex items-center gap-6.5">
                            <div ref={scrollerRef} className={`flex-1 overflow-x-auto [-ms-overflow-style:none]
                                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                            >
                                <div className="flex items-center sm:gap-5 gap-2 whitespace-nowrap snap-x">
                                    {TABS.map((tab, index) => {
                                        const active = tab.id === activeTab;

                                        return (
                                            <button key={index} ref={(element) => (tabRefs.current[tab?.id] = element)}
                                                onClick={() => onTabClick(tab.id)} className={`relative shrink-0 
                                                    snap-start cursor-pointer rounded-full px-4 sm:px-5 py-3
                                                    body-2 transition-colors duration-300 ${active ? "text-white" :
                                                        "text-[#F36B21] hover:bg-[#F36B21] hover:text-white"}`}
                                            >
                                                {active && (
                                                    <motion.span layoutId="active-pill"
                                                        className="absolute inset-0 rounded-full bg-[#F36B21]"
                                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                                    />
                                                )}

                                                <span className="relative z-10">{tab.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <img src="/logo/search-icon.svg" alt="Search Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                    </div>

                    <div className='pt-5 relative z-10'>
                        <Playlist mode="page" />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Episodes