"use client";

import { FAQ_ITEMS } from '@/utils/staticData';
import Link from 'next/link';
import React, { Fragment, useState } from 'react'

const GuestPortal = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <Fragment>
            <section className="relative h-[90vh]">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/guest-portal-desktop.webp)" }}
                        className="hidden md:block h-full bg-cover lg:bg-center md:bg-position-[90%] bg-position-[80%]"
                    />

                    <div className="block md:hidden h-full w-full bg-cover bg-bottom"
                        style={{ backgroundImage: "url(/images/guest-portal-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 h-full">
                            <div className="md:col-span-9 lg:col-span-7">
                                <h1 className="heading-1 text-white lg:mt-0 md:-mt-20 mt-15">
                                    Got a perspective to share?
                                </h1>

                                <p className='body-2 text-[#E8E8E8] font-light mt-4 lg:max-w-xl'>
                                    Deep conversations with those shaping markets and ideas. We value depth, reasoning,
                                    and experience over titles or fame.
                                </p>
                            </div>

                            <div className="md:col-span-3 lg:col-span-5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Voices We Invite Section */}
            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:items-end">
                        <div className="lg:col-span-5">
                            <h4 className="heading-4 text-white">Voices We Invite</h4>
                            <p className="body-1 mt-8 text-[#E8E8E8]">We regularly feature:</p>

                            <ul className="body-1 mt-5 space-y-2.5 text-[#E8E8E8] list-disc pl-5">
                                <li>Founders & Operators navigating growth and scale.</li>
                                <li>Policy Thinkers & Academics examining systems and governance.</li>
                                <li>Investors & Strategists shaping global capital flows.</li>
                                <li>Technologists building infrastructure and platforms.</li>
                                <li>Cultural & Institutional Leaders influencing public thought.</li>
                            </ul>

                            <p className="mt-6 body-1 text-[#E8E8E8] max-w-md">
                                We bridge the gap between high-level theory and lived leadership.
                            </p>
                        </div>

                        <div className="lg:col-span-7 xl:mt-0 mt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
                                    <img src="/images/radio-personality.png" alt="Radio Personality"
                                        className="h-full w-full object-containe md:flex hidden"
                                    />

                                    <img src="/images/radio-personality-sm.png" alt="Radio Personality"
                                        className="h-full w-full object-containe md:hidden flex"
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6 h-full">
                                    <div className="grid grid-cols-12 gap-5 h-full">
                                        <div className="col-span-9">
                                            <img src="/images/nobody-podcast.png" alt="Nobody Podcast"
                                                className="h-full object-containe md:flex hidden"
                                            />

                                            <img src="/images/nobody-podcast-sm.png" alt="Nobody Podcast"
                                                className="h-full w-full object-containe md:hidden flex"
                                            />
                                        </div>

                                        <div className="col-span-3">
                                            <img src="/images/female-content.png" alt="Female Content"
                                                className="h-full object-containe md:flex hidden"
                                            />

                                            <img src="/images/female-content-sm.png" alt="Female Content"
                                                className="h-full w-full rounded-[18px] object-containe md:hidden flex"
                                            />
                                        </div>

                                        <div className="col-span-3">
                                            <img src="/images/retro-microphone.png" alt="Retro Microphone"
                                                className="h-full object-containe md:flex hidden"
                                            />
                                            <img src="/images/retro-microphone-sm.png" alt="Retro Microphone"
                                                className="h-full w-full rounded-[18px] object-containe md:hidden flex"
                                            />
                                        </div>

                                        <div className="col-span-9">
                                            <img src="/images/multiethnic-team.png" alt="Multiethnic Team"
                                                className="h-full object-containe md:flex hidden"
                                            />
                                            <img src="/images/multiethnic-team-sm.png" alt="Multiethnic Team"
                                                className="h-full w-full object-containe md:hidden flex"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What To Expect Section */}
            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className={`grid grid-cols-1 md:rounded-[30px] linear-background-secondary py-7 md:py-12 
                        px-5 sm:px-8 lg:px-15 lg:grid-cols-12 gap-8 rounded-2xl`}
                    >
                        <div className="lg:col-span-6">
                            <h4 className="heading-4 text-white">What to expect.</h4>
                            <ul className="mt-5 space-y-3 text-[#E8E8E8] body-1 list-disc pl-5">
                                <li>A focused 45-60 minute uninterrupted dialogue format</li>
                                <li>Archival visibility across digital channels</li>
                                <li>A space to articulate frameworks and philosophies in depth</li>
                                <li>Association with a curated intellectual ecosystem</li>
                            </ul>
                        </div>

                        <div className="lg:col-span-6 flex justify-center lg:justify-end">
                            <img src="/images/what-to-expect.webp" alt="Podcast Host" className="w-max h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently asked questions Section */}
            <section className="sm:px-10 px-5">
                <div className="container mx-auto ">
                    <h4 className="heading-4 spacing text-white">Frequently asked questions</h4>

                    <div className="space-y-4">
                        {FAQ_ITEMS?.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div key={index} className="rounded-2xl bg-[#341606] overflow-hidden">
                                    <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="w-full flex items-center gap-4 px-6 py-4 cursor-pointer"
                                    >
                                        <h6 className="heading-6 text-white">{item?.title}</h6>

                                        <div className={`shrink-0 transition-transform duration-300 ease-in-out 
                                            ${isOpen ? "rotate-180" : "rotate-0"}`}
                                        >
                                            <img src='/logo/arrow-down.png' alt="Arrow Down" className='h-6.5 w-6.5' />
                                        </div>
                                    </button>

                                    <div className={`px-6 transition-all duration-500 ease-in-out overflow-hidden 
                                        ${isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                                    >
                                        <p className={`body-1 text-[#E8E8E8] opacity-80 transition-all duration-500 
                                            ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-2"}`}
                                        >
                                            {item?.des}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 rounded-2xl bg-[#341606] px-6 py-7">
                        <h5 className="heading-5 text-white">
                            Still have questions?
                        </h5>

                        <p className="body-1 mt-2 text-[#E8E8E8]">
                            Can’t find the answer to your question? send us an email and we’ll get back to you as
                            soon as possible
                        </p>

                        <div className="mt-5">
                            <button className={`inline-flex flex-nowrap items-center gap-3 rounded-full cursor-pointer 
                                cta-1 justify-center whitespace-nowrap bg-white text-[#F36B21] py-2 pl-5 pr-2.5`}
                            >
                                <span className="whitespace-nowrap">Send email</span>
                                <img src='/logo/email-contact.png' alt="Button" className="h-auto w-max shrink-0" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default GuestPortal