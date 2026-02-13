"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import BtnComponent from './BtnComponent'
import Image from 'next/image';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 w-full py-6 sm:px-10 px-5 rounded-full">
            <div className='container mx-auto rounded-full bg-white/10 backdrop-blur-[23.4px] pr-6 pl-10 py-3'>
                <div className='flex justify-between w-full items-center'>
                    <Link id="logo-wrapper" href="/" className="inline-block my-auto">
                        <Image
                            id="logo"
                            className='w-auto'
                            width={0}
                            height={0}
                            src='/logo/occams-podcast.svg'
                            alt="Occams Podcast" />
                    </Link>

                    <div className={`lg:flex items-center xl:gap-8 md:gap-6 gap-8 text-base hidden h-18 pr-9 text-white
                        font-medium`}>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M2.32855 16H5.01649V10.4791C5.01649 9.82214 5.57466 9.28409 6.26596 9.28409H10.734C11.4253 9.28409 11.9835 9.82214 11.9835 10.4791V16H14.6715C15.9591 16 17 14.9872 17 13.7554V6.3825C17 5.65284 16.6308 4.95908 16.0061 4.54848L9.8342 0.397134C9.02932 -0.132378 7.96977 -0.132378 7.16489 0.397134L0.993893 4.53907C0.36916 4.95908 0 5.65196 0 6.3825V13.7554C0 14.9872 1.0418 16 2.32855 16Z" fill="#F16A21" />
                            </svg>
                        </Link>

                        <Link href='/episodes'>Episodes</Link>
                        <Link href='/guest-portal'>Guest Portal</Link>
                        <Link href='/team'>Team</Link>
                        <Link href='/contact'>Contact</Link>
                    </div>

                    <BtnComponent btn_title={'Login'} btn_url={'#'} className="hidden" />

                    <button className="lg:hidden flex items-center justify-center relative w-10 h-10 cursor-pointer"
                        onClick={toggleMenu}
                    >
                        <img src="/images/menu_icon.svg" className={`absolute w-8 h-8 transition-all duration-300
                            ease-in-out ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                            alt="Menu Icon"
                        />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth={2} className={`absolute w-8 h-8 text-white transition-all duration-300 ease-in-out
                            ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className={`absolute top-20 right-5 w-[65%] sm:w-1/2 bg-white border border-[#E3E3E3]
                    rounded-2xl shadow-lg p-6 z-50 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full pointer-events-none"}`}
                >
                    <ul className="flex flex-col gap-4">
                        <Link href='/episodes'>Episodes</Link>
                        <Link href='/guest-portal'>Guest Portal</Link>
                        <Link href='/team'>Team</Link>
                        <Link href='/contact'>Contact</Link>
                        <Link href='/login'>Login</Link>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar