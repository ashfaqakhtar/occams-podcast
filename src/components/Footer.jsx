"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="sm:px-10 px-5">
            <Script
                src="https://cdn.iubenda.com/iubenda.js"
                strategy="afterInteractive"
            />
            <div className="container mx-auto spacing">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 max-w-60 lg:max-w-100">
                        <Image id="logo" className='w-max' width={0} height={0} alt="Occams Podcast"
                            src='/logo/occams-podcast-footer.svg'
                        />

                        <h4 className="mt-1.5 heading-4 text-white">Inception to Infinity Podcast</h4>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-12 gap-6 h-full items-end">
                            <div className="col-span-12 lg:col-span-8">
                                <nav className={`grid grid-cols-2 md:grid-cols-1 gap-y-5 md:flex md:items-end md:gap-6 
                                    heading-6 lg:justify-evenly text-white`}
                                >
                                    {/* <Link href="/about">About</Link> */}
                                    <Link href="/episodes">Episodes</Link>
                                    <Link href="/guest-portal">Guest Portal</Link>
                                    <Link href="https://occamsadvisory.com" target="_blank">
                                        Occams Advisory
                                    </Link>
                                </nav>
                            </div>

                            <div className="col-span-12 lg:col-span-4">
                                <div className="flex items-center gap-6 text-white lg:justify-evenly">
                                    <Link href="https://youtube.com/@occams_advisory?si=OZVBc-R1Ch04GIT1" target="_blank">
                                        <Image className='w-max' width={0} height={0} alt="Occams Podcast"
                                            src='images/you-tube.svg'
                                        />
                                    </Link>

                                    <Link href="https://open.spotify.com/show/1FCHwR8dWex7l8jHjFqKou?si=0dbe85ff6bdb471b"
                                        target="_blank"
                                    >
                                        <Image className='w-max' width={0} height={0} alt="Occams Podcast"
                                            src='images/spotify.svg'
                                        />
                                    </Link>

                                    <Link href="https://www.linkedin.com/company/occamsadvisory/posts/?feedView=all"
                                        target="_blank"
                                    >
                                        <Image className='w-max' width={0} height={0} alt="Occams Podcast"
                                            src='images/linkedin.svg'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-[#676767] my-9.75" />

                <div className="flex flex-col gap-5 body-2 text-white md:flex-row md:justify-between">
                    <p>© {year} Occams Advisory All rights reserve</p>

                    <div className="flex sm:gap-5 gap-3">
                        <a
                            href="https://www.iubenda.com/privacy-policy/89600218"
                            className="iubenda-white iubenda-noiframe iubenda-embed"
                            title="Privacy Policy"
                        >
                            Privacy Policy
                        </a>

                        <span className="text-white">|</span>

                        <a
                            href="https://www.iubenda.com/terms-and-conditions/89600218"
                            className="iubenda-white iubenda-noiframe iubenda-embed"
                            title="Terms and Conditions"
                        >
                            Terms and Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer
