"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import BtnComponent from "@/components/BtnComponent";
import { BADGES_ITEMS } from "@/utils/staticData";
import Highlights from "@/components/Highlights";
import EpisodeWave from "@/components/EpisodeWave";
import Playlist from "@/components/Playlist";

function EpisodeCard({ item, variant = "side", onClick }) {
    const isCenter = variant === "center";

    return (
        <div
            className={[
                "col-span-12 sm:col-span-4",
                isCenter ? "md:col-span-4" : "md:col-span-4",
            ].join(" ")}
        >
            <Link
                href={item.href}
                onClick={(e) => {
                    // if side card clicked, use it as navigation inside carousel
                    if (!isCenter) {
                        e.preventDefault();
                        onClick?.();
                    }
                }}
                className={[
                    "group relative block overflow-hidden rounded-2xl border border-white/10",
                    "bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.55)]",
                    isCenter
                        ? "h-[210px] sm:h-[230px] md:h-[250px]"
                        : "h-[170px] sm:h-[190px] md:h-[210px] opacity-75 hover:opacity-90",
                ].join(" ")}
            >
                {/* thumbnail */}
                <div className="absolute inset-0">
                    <img
                        src={item.thumb}
                        alt={item.title}
                        className={[
                            "h-full w-full object-cover transition duration-500",
                            isCenter ? "group-hover:scale-[1.03]" : "scale-[1.02] blur-[0px]",
                        ].join(" ")}
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0" />
                </div>

                {/* bottom mini controls like screenshot */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white/80 text-[11px]">
                            ▶
                        </span>

                        <span className="text-[11px] text-white/75 line-clamp-1">
                            {item.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-white/70">
                        <span className="text-[11px]">⟲</span>
                        <span className="text-[11px]">⛶</span>
                        <span className="text-[11px]">🔊</span>
                    </div>
                </div>

                {/* subtle highlight border for center */}
                {isCenter && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#F36B2140]" />
                )}
            </Link>
        </div>
    );
}
const Home = () => {
    useEffect(() => {
        const MID = () => window.innerHeight / 2;
        const nodes = Array.from(document.querySelectorAll("[data-split]"));

        nodes.forEach((node) => {
            const text = node.textContent || "";
            node.textContent = "";

            const frag = document.createDocumentFragment();
            const charSpans = [];

            for (let i = 0; i < text.length; i++) {
                const ch = text[i];

                if (ch === " ") {
                    frag.appendChild(document.createTextNode(" "));
                    continue;
                }

                const span = document.createElement("span");
                span.className = "subhead-2 text-[#FFFFFF59] char";
                span.textContent = ch;

                charSpans.push(span);
                frag.appendChild(span);
            }

            node.appendChild(frag);
            node._chars = charSpans;
            node._activeCount = 0;
        });

        const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

        function update() {
            const mid = MID();

            nodes.forEach((node) => {
                const rect = node.getBoundingClientRect();
                const chars = node._chars || [];
                if (!chars.length) return;

                const progress = clamp((mid - rect.top) / Math.max(rect.height, 1), 0, 1);
                const target = Math.floor(progress * chars.length);

                if (target === node._activeCount) return;

                if (target > node._activeCount) {
                    for (let i = node._activeCount; i < target; i++) {
                        const s = chars[i];
                        if (!s) continue;
                        s.classList.remove("subhead-2", "text-[#FFFFFF59]");
                        s.classList.add("subhead-1", "text-[#F36B21]");
                    }
                } else {
                    for (let i = target; i < node._activeCount; i++) {
                        const s = chars[i];
                        if (!s) continue;
                        s.classList.add("subhead-2", "text-[#FFFFFF59]");
                        s.classList.remove("subhead-1", "text-[#F36B21]");
                    }
                }

                node._activeCount = target;
            });
        }

        const style = document.createElement("style");
        style.textContent = `.char { transition: color .18s ease-out; }`;
        document.head.appendChild(style);

        update();
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", update);
            style.remove();
        };
    }, []);

    const items = useMemo(
        () => [
            {
                id: 1,
                title: "Episode 12 — Scaling Systems",
                thumb:
                    "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1400&q=80",
                href: "#",
            },
            {
                id: 2,
                title: "Episode 13 — Markets & Decisions",
                thumb:
                    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80",
                href: "#",
            },
            {
                id: 3,
                title: "Episode 14 — Leadership Under Uncertainty",
                thumb:
                    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80",
                href: "#",
            },
            {
                id: 4,
                title: "Episode 15 — Strategy & Clarity",
                thumb:
                    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1400&q=80",
                href: "#",
            },
            {
                id: 5,
                title: "Episode 16 — Building for the Long Term",
                thumb:
                    "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=80",
                href: "#",
            },
        ],
        []
    );

    const [active, setActive] = useState(1); // start from middle
    const trackRef = useRef(null);

    const clampIndex = (i) => {
        const n = items.length;
        return (i + n) % n;
    };

    const prev = () => setActive((p) => clampIndex(p - 1));
    const next = () => setActive((p) => clampIndex(p + 1));

    // keyboard support
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---- simple drag/swipe
    const drag = useRef({ down: false, x: 0, moved: false });

    const onDown = (clientX) => {
        drag.current = { down: true, x: clientX, moved: false };
    };
    const onMove = (clientX) => {
        if (!drag.current.down) return;
        const dx = clientX - drag.current.x;
        if (Math.abs(dx) > 8) drag.current.moved = true;
    };
    const onUp = (clientX) => {
        if (!drag.current.down) return;
        const dx = clientX - drag.current.x;
        drag.current.down = false;

        // swipe threshold
        if (Math.abs(dx) < 40) return;
        if (dx > 0) prev();
        else next();
    };

    const idxLeft = clampIndex(active - 1);
    const idxRight = clampIndex(active + 1);


    return (
        <Fragment>
            <section style={{ backgroundImage: `url(/images/hero-banner.webp)` }} className={`bg-cover bg-center
                h-screen flex justify-center items-center relative sm:px-10 px-5`}
            >
                <div className="container mx-auto h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:gap-8 gap-5">
                        <div className={`h-full flex flex-row justify-start items-end -mt-10 lg:order-0 order-1`}>
                            <div className="w-max h-max rounded-full bg-white/10 backdrop-blur-[23.4px] px-10 pt-3 pb-4">
                                <small className="text-white">Listen on:</small>

                                <div className="flex gap-4 mt-1.5">
                                    <Link href="">
                                        <Image className="w-auto" src="/logo/spotify.svg" alt="Spotify"
                                            width={0} height={40} priority
                                        />
                                    </Link>

                                    <Link href="">
                                        <Image className="w-auto" src="/logo/youtube.svg" alt="youtube"
                                            width={0} height={40} priority
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={`lg:mt-13 mt-8 flex lg:justify-center justify-end flex-col
                            lg:order-1 order-0 max-w-150`}
                        >
                            <Image id="logo" className='w-max' width={0} height={0}
                                src='/logo/occams-podcast-footer.svg' alt="Occams Podcast"
                            />

                            <h1 className={`py-4 text-white heading-1`}>
                                Inception to Infinity Podcast
                            </h1>

                            <p className="font-light body-2 text-[#E8E8E8]">
                                A dialogue for system builders on capital, tech, and governance. Deep dives into reasoning,
                                structure, and trade-offs, not surface sound bites.
                            </p>

                            <div className="flex sm:flex-row flex-col gap-5 sm:items-center mt-6">
                                <BtnComponent btn_title={'Listen Now'} btn_url={'#'} className="py-2 pl-5 pr-2.5"
                                    image={'/images/listen-now.svg'}
                                />

                                <BtnComponent btn_title={'Request a Feature'} bgColor="bg-[#282828]"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto">
                    <div className="pt-10 pb-12">
                        <div className="flex items-center justify-between">
                            <h4 className="text-white/80 text-sm md:text-base font-medium">
                                Trending Episodes
                            </h4>

                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={prev}
                                    className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                    aria-label="Previous"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={next}
                                    className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                    aria-label="Next"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* Stage */}
                        <div
                            ref={trackRef}
                            className="relative mt-8 select-none"
                            onMouseDown={(e) => onDown(e.clientX)}
                            onMouseMove={(e) => onMove(e.clientX)}
                            onMouseUp={(e) => onUp(e.clientX)}
                            onMouseLeave={(e) => onUp(e.clientX)}
                            onTouchStart={(e) => onDown(e.touches[0].clientX)}
                            onTouchMove={(e) => onMove(e.touches[0].clientX)}
                            onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
                        >
                            {/* subtle vignette like screenshot */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />

                            <div className="grid grid-cols-12 items-center gap-4 md:gap-6">
                                {/* LEFT */}
                                <EpisodeCard
                                    item={items[idxLeft]}
                                    variant="side"
                                    onClick={() => setActive(idxLeft)}
                                />

                                {/* CENTER */}
                                <EpisodeCard
                                    item={items[active]}
                                    variant="center"
                                    onClick={() => { }}
                                />

                                {/* RIGHT */}
                                <EpisodeCard
                                    item={items[idxRight]}
                                    variant="side"
                                    onClick={() => setActive(idxRight)}
                                />
                            </div>

                            {/* Mobile controls */}
                            <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
                                <button
                                    onClick={prev}
                                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                    aria-label="Previous"
                                >
                                    ‹
                                </button>

                                <button
                                    onClick={next}
                                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                    aria-label="Next"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Dots */}
                            <div className="mt-3 flex items-center justify-center gap-2">
                                {items.map((_, i) => {
                                    const isOn = i === active;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setActive(i)}
                                            className={[
                                                "h-1.5 rounded-full transition-all",
                                                isOn ? "w-7 bg-[#F36B21]" : "w-3 bg-white/25",
                                            ].join(" ")}
                                            aria-label={`Go to slide ${i + 1}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <p className="mt-2 text-center text-xs text-white/35">
                            Tip: drag/swipe to move • arrows to control
                        </p>
                    </div>
                </div>
            </section>

            <div className="spacing">
                <Highlights />
            </div>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-4">
                            <span className={`inline-flex w-max items-center rounded-full bg-[#FFFFFF1A] px-5 py-1.5 
                                caption-2 text-[#F36B21] font-normal`}
                            >
                                About the Podcast
                            </span>

                            <h4 className="heading-4 text-white mt-2.5 font-normal">
                                Why This <br className="lg:flex hidden" /> Podcast Exists?
                            </h4>
                        </div>

                        <div className="col-span-12 lg:col-span-8 lg:mt-0 mt-4">
                            <h6 className="subhead-1 text-[#F36B21]">
                                Inception to Infinity is a long-form podcast for those building and governing systems. We
                                explore decision mechanics, capital, and organizational design, prioritizing reasoning and
                                trade-offs over sound bites.

                                <span className="text-[#FFFFFF5E]" id="why-we-exist" data-split>
                                    While modern growth rewards speed, speed rarely rewards clarity. We exist to slow down,
                                    questioning assumptions and mapping consequences to understand how intention becomes
                                    structure and structure becomes legacy. We examine the foundations before organizations
                                    scale.
                                </span>
                            </h6>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing relative">
                    <p className={`inline-flex w-max items-center rounded-full bg-[#FFFFFF1A] px-5 py-1.5 
                        caption-2 text-[#F36B21] font-normal`}
                    >
                        Latest Episodes
                    </p>

                    <h4 className="heading-4 text-white mt-2.5 font-normal">
                        Featured Conversations
                    </h4>

                    <Playlist mode="home" />
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className={`grid grid-cols-1 rounded-[30px] bg-[#2A180E] py-7 md:py-12 px-5 
                        lg:px-12 lg:grid-cols-12 gap-8`}
                    >
                        <div className="lg:col-span-6 flex flex-col justify-center">
                            <span className={`inline-flex w-max items-center rounded-full bg-white px-5 py-1.5 
                                caption-2 text-[#F36B21]`}
                            >
                                Entrepreneurship
                            </span>

                            <div className="mt-5">
                                <Image id="logo" className='w-50 h-13' width={0} height={0} alt="Occams"
                                    src='/logo/occams-podcast.svg'
                                />
                            </div>

                            <h6 className="mt-6 heading-6 text-[#C4BBBB]">The Thinking Behind the Conversations</h6>
                            <h6 className="mt-5 italic heading-6 text-[#F36B21]">Our Genesis</h6>

                            <p className="heading-6 text-[#F36B21]">
                                Since 2012, we’ve helped businesses move from ambition to sustainable scale via capital
                                markets and fintech. Our expertise informs Inception to Infinity, our flagship podcast
                                for leaders building with conviction.
                            </p>

                            <p className="mt-5 heading-6 text-[#FFFFFF82]">
                                Powered by Occams Digital, we explore the human side of leadership-from early doubts to
                                enduring impact—to help you turn strategic ideas into a lasting digital legacy.
                            </p>
                        </div>

                        <div className="lg:col-span-6 flex lg:justify-end">
                            <img src="/images/conversations-home.webp" alt="Podcast Host" className="w-max h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <h6 className="text-white heading-4 text-center">
                        Join a conversation that outlives the news cycle & builds
                        <br className="hidden lg:block" /> lasting legacy.
                    </h6>

                    <p className="mt-4 text-center body-2 text-[#E8E8E8]">Subscribe and stay Inspired</p>

                    <div className="mt-10 hidden lg:flex flex-wrap items-center justify-center gap-4">
                        {BADGES_ITEMS?.map((item, index) => (
                            <Link key={index} href={item?.href} className={`group inline-flex items-center gap-3
                                transition hover:-translate-y-px`}
                            >
                                <img src={item?.image} alt={item?.name} className="w-max h-auto" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:flex lg:hidden flex-wrap items-center justify-center gap-4">
                        {BADGES_ITEMS?.map((item, index) => (
                            <Link key={index} href={item?.href} className={`group inline-flex items-center gap-3
                                transition hover:-translate-y-px justify-evenly`}
                            >
                                <img src={item?.mobile_image} alt={item?.name} className="w-max h-auto" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <div className="spacing">
                <EpisodeWave />
            </div>
        </Fragment>
    );
}

export default Home