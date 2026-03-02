"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BtnComponent from './BtnComponent'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/utils/staticData';

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(href + "/");
    };

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-999 w-full py-6 sm:px-10 px-5 rounded-full">
            <div className='container mx-auto rounded-full bg-white/10 backdrop-blur-[23.4px] pr-6 sm:pl-8 pl-6 py-2.5'>
                <div className='flex justify-between w-full items-center'>
                    <Link id="logo-wrapper" href="/" prefetch={false} className="inline-block my-auto">
                        <Image id="logo" className='w-max mt-2' width={0} height={0}
                            src='/logo/occams-podcast-footer.svg' alt="Occams Podcast"
                        />
                    </Link>

                    <div className="lg:flex items-center xl:gap-8 md:gap-6 gap-8 caption-1 hidden h-18 pr-9 text-white">
                        <Link href="/" prefetch={false}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16"
                                fill="currentColor" className={isActive("/") ? "text-[#F16A21]" : "text-white"}
                            >
                                <path d="M2.32855 16H5.01649V10.4791C5.01649 9.82214 5.57466 9.28409 6.26596 9.28409H10.734C11.4253 9.28409 11.9835 9.82214 11.9835 10.4791V16H14.6715C15.9591 16 17 14.9872 17 13.7554V6.3825C17 5.65284 16.6308 4.95908 16.0061 4.54848L9.8342 0.397134C9.02932 -0.132378 7.96977 -0.132378 7.16489 0.397134L0.993893 4.53907C0.36916 4.95908 0 5.65196 0 6.3825V13.7554C0 14.9872 1.0418 16 2.32855 16Z" />
                            </svg>
                        </Link>

                        {NAV_ITEMS?.filter((menu) => menu.href !== "/").map((item) => (
                            <Link key={item?.href} href={item?.href} prefetch={false}
                                className={isActive(item?.href) ? "text-[#F16A21]" : "text-white"}
                            >
                                {item?.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:block">
                        <BtnComponent btn_title="Request a Feature" className="py-3.5 px-8"
                            btn_url="https://calendly.com/occamspodcast/2?back=1&month=2026-02"
                        />
                    </div>

                    <button className="lg:hidden flex items-center justify-center relative w-10 h-10 cursor-pointer"
                        onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}
                    >
                        <img className="absolute w-8 h-8 transition-all duration-300 ease-in-out"
                            src="/images/menu_icon.svg" alt="Menu Icon"
                        />
                    </button>
                </div>
            </div>

            <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ?
                "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="absolute inset-0 bg-black" onClick={closeMenu} />

                <div className={`absolute top-0 right-0 h-full w-full bg-black sm:px-10 px-5 transition-transform 
                    pt-8 duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='container mx-auto'>
                        <div className="flex items-start justify-between">
                            <Link id="logo-wrapper" href="/" prefetch={false} className="inline-block my-auto">
                                <Image id="logo" className='w-auto' width={0} height={0} alt="Occams"
                                    src='/logo/occams-podcast.svg'
                                />
                            </Link>

                            <button onClick={closeMenu} aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    strokeWidth={2} className={`w-8 h-8 text-white transition-all duration-300 ease-in-out`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="my-6 h-px w-full bg-[#DDD]" />

                        <nav className="mt-8 space-y-8 text-white caption-1 max-w-70">
                            {NAV_ITEMS?.map((item) => {
                                const active = isActive(item?.href);

                                return (
                                    <Link key={item?.href} href={item?.href} prefetch={false} onClick={closeMenu} className={`flex pl-8
                                        items-center justify-between rounded-xl transition-colors
                                        ${active ? "bg-[#332E2E] py-3 pr-12" : ""}`}
                                    >
                                        <span>{item?.label}</span>

                                        {active && (
                                            <img src='/images/arrow-right.svg' alt="Arrow Right"
                                                className="h-auto w-max shrink-0"
                                            />
                                        )}
                                    </Link>
                                );
                            })}

                            <div className='mt-10' >
                                <BtnComponent btn_title={'Request a Feature'} btn_url={'#'} className='py-2 px-12' />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
