"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
                {/* Top row */}
                <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
                    {/* Left: logo + tagline */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-semibold tracking-tight">
                                occams<span className="text-white/70">podcast</span>
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-white/60">
                            A podcast by Occams Advisory
                        </p>
                    </div>

                    {/* Center: nav */}
                    <nav className="flex flex-wrap items-center gap-6 text-sm text-white/80 md:justify-center">
                        <Link href="/about" className="hover:text-white transition">About</Link>
                        <Link href="/episodes" className="hover:text-white transition">Episodes</Link>
                        <Link href="/subscribe" className="hover:text-white transition">Subscribe</Link>
                        <Link href="https://occamsadvisory.com" target="_blank" className="hover:text-white transition">
                            Occams Advisory
                        </Link>
                    </nav>

                    {/* Right: socials */}
                    <div className="flex items-center gap-5 text-white/80 md:justify-end">
                        <Link
                            href="https://x.com"
                            target="_blank"
                            aria-label="X"
                            className="hover:text-white transition"
                        >
                            X
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            aria-label="LinkedIn"
                            className="hover:text-white transition"
                        >
                            in
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10" />

                {/* Bottom row */}
                <div className="flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
                    <p>© 2025 Occams Advisory. All rights reserved</p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/policy" className="hover:text-white transition">Policy</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/terms" className="hover:text-white transition">Terms Of Service</Link>
                        <span className="text-white/20">|</span>
                        <Link href="/terms-condition" className="hover:text-white transition">Terms &amp; Condition</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
