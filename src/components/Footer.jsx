"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="sm:px-10 px-5">
            <div className="container mx-auto spacing">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 max-w-60 lg:max-w-100">
                        <Image id="logo" className='w-max' width={0} height={0} alt="Occams Podcast"
                            src='/logo/occams-podcast-footer.svg'
                        />

                        <h4 className="mt-1.5 heading-4 text-white">Inception to Infinity Podcast</h4>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-12 gap-6 h-full items-end">
                            <div className="col-span-12 lg:col-span-10">
                                <nav className={`grid grid-cols-2 md:grid-cols-1 gap-y-5 md:flex md:items-end md:gap-6 
                                    heading-6 lg:justify-evenly text-white`}
                                >
                                    <Link href="/about">About</Link>
                                    <Link href="/episodes">Episodes</Link>
                                    <Link href="/subscribe">Subscribe</Link>
                                    <Link href="https://occamsadvisory.com" target="_blank">
                                        Occams Advisory
                                    </Link>
                                </nav>
                            </div>

                            <div className="col-span-12 lg:col-span-2">
                                <div className="flex items-center gap-6 text-white lg:justify-evenly">
                                    <Link href="https://x.com" target="_blank">
                                        X
                                    </Link>

                                    <Link href="https://linkedin.com" target="_blank">
                                        in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-[#676767] my-9.75" />

                <div className="flex flex-col gap-5 body-2 text-white md:flex-row md:justify-between">
                    <p>© {year} Occams Advisory All rights reserve</p>

                    <div className="flex sm:flex-row flex-col sm:items-center gap-5">
                        <Link href="/privacy">Privacy</Link>

                        <span className="text-white sm:flex hidden">|</span>

                        <Link href="/policy">Policy</Link>

                        <span className="text-white sm:flex hidden">|</span>

                        <Link href="/terms">Terms Of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer