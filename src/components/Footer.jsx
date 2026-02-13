"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-black text-white">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">

                <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">

                    <div className="flex flex-col">
                        <Image
                            id="logo"
                            className='w-auto'
                            width={0}
                            height={0}
                            src='/logo/occams-podcast-footer.svg'
                            alt="Occams Podcast" />
                        <p className="mt-1 text-xs text-white/60">
                            A podcast by Occams Advisory
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center gap-6 text-sm text-white/80 md:justify-center">
                        <Link href="/about" className="hover:text-white transition">About</Link>
                        <Link href="/episodes" className="hover:text-white transition">Episodes</Link>
                        <Link href="/subscribe" className="hover:text-white transition">Subscribe</Link>
                        <Link href="https://occamsadvisory.com" target="_blank" className="hover:text-white transition">
                            Occams Advisory
                        </Link>
                    </nav>

                    <div className="flex items-center gap-5 text-white/80 md:justify-end">
                        <Link href="https://x.com" target="_blank" className="hover:text-white transition">X</Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition">in</Link>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
                    <p>© {year} Occams Advisory. All rights reserved</p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/policy" className="hover:text-white transition">Policy</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/terms" className="hover:text-white transition">Terms Of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
