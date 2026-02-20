"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import BtnComponent from "@/components/BtnComponent";
import { BADGES_ITEMS, PODCAST_EXISTS } from "@/utils/staticData";
import Highlights from "@/components/Highlights";
import EpisodeWave from "@/components/EpisodeWave";
import Playlist from "@/components/Playlist";
import EpisodeCard from "@/components/EpisodeCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

    const itemsStatic = useMemo(
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

    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;
    const [items, setItems] = useState([]);
    const [active, setActive] = useState(0);
    const [playingVideoId, setPlayingVideoId] = useState("");
    const [isSliderHovered, setIsSliderHovered] = useState(false);
    const trackRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        const fetchTrendingEpisodes = async () => {
            if (!API_KEY || !PLAYLIST_ID) return;

            try {
                const res = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
                );
                if (!res.ok) return;

                const data = await res.json();
                const mapped = (data?.items || [])
                    .map((it, index) => {
                        const sn = it?.snippet || {};
                        const videoId = it?.contentDetails?.videoId;
                        const thumb =
                            sn?.thumbnails?.maxres?.url ||
                            sn?.thumbnails?.high?.url ||
                            sn?.thumbnails?.medium?.url ||
                            sn?.thumbnails?.default?.url ||
                            "";

                        return {
                            id: videoId || index + 1,
                            title: sn?.title || "Untitled Episode",
                            thumb,
                            videoId: videoId || "",
                            href: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "#",
                        };
                    })
                    .filter((item) => {
                        const t = (item.title || "").toLowerCase();
                        return (
                            t !== "private video" &&
                            t !== "deleted video" &&
                            Boolean(item.thumb) &&
                            Boolean(item.videoId)
                        );
                    });

                if (!mapped.length || cancelled) return;

                const videoIds = mapped.map((item) => item.videoId).filter(Boolean).slice(0, 50);
                if (!videoIds.length) return;

                const statsRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${API_KEY}`
                );
                if (!statsRes.ok) return;

                const statsData = await statsRes.json();
                const viewMap = {};
                (statsData?.items || []).forEach((it) => {
                    const id = it?.id;
                    const views = Number(it?.statistics?.viewCount || 0);
                    if (id) viewMap[id] = views;
                });

                const topFive = mapped?.map((item) => ({ ...item, views: viewMap[item.videoId] || 0 }))
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map(({ views, ...rest }) => rest);

                if (!cancelled && topFive.length >= 3) {
                    setItems(topFive);
                    setActive(0);
                    setPlayingVideoId("");
                }
            } catch (err) {
                return err
            }
        };

        fetchTrendingEpisodes();

        return () => {
            cancelled = true;
        };
    }, [API_KEY, PLAYLIST_ID]);

    const clampIndex = (i) => {
        const n = items.length;
        if (!n) return 0;
        return (i + n) % n;
    };

    const goToSlide = (index) => {
        setPlayingVideoId("");
        setActive(clampIndex(index));
    };

    const prev = () => goToSlide(active - 1);
    const next = () => goToSlide(active + 1);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, items.length]);

    useEffect(() => {
        if (items.length < 2 || isSliderHovered || Boolean(playingVideoId)) return;

        const intervalId = setInterval(() => {
            setActive((p) => clampIndex(p + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [items.length, isSliderHovered, playingVideoId]);

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

        if (Math.abs(dx) < 40) return;
        if (dx > 0) prev();
        else next();
    };

    const onTrackMouseEnter = () => {
        setIsSliderHovered(true);
    };

    const onTrackMouseLeave = (clientX) => {
        setIsSliderHovered(false);
        onUp(clientX);
    };

    const idxLeft = clampIndex(active - 1);
    const idxRight = clampIndex(active + 1);

    return (
        <Fragment>
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/home-banner-desktop.webp)" }}
                        className="hidden md:block h-full bg-cover lg:bg-center md:bg-position-[70%] bg-position-[80%]"
                    />

                    <div className="block md:hidden h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: "url(/images/home-banner-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 h-full">
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

                            <div className="lg:mt-15 mt-25">
                                <Image id="logo"className='w-max' width={0} height={0} alt="Occams"
                                    src='/logo/occams-podcast.svg'
                                />

                                <h1 className={`heading-1 sm:py-3.5 py-2 text-white`}>
                                    Inception to Infinity Podcast
                                </h1>

                                <p className="font-light body-2 text-[#E8E8E8]">
                                    A dialogue for system builders on capital, tech, and governance. Deep dives into
                                    reasoning, structure, and trade-offs, not surface sound bites.
                                </p>

                                <BtnComponent btn_title={'Listen Now'} btn_url={'#'} className="mt-6 py-1.5 pl-5 pr-2.5"
                                    image={'/images/listen-now.svg'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className={`flex gap-5 sm:flex-row flex-col sm:items-center items-start justify-between sm:mb-10`}>
                        <h4 className="heading-4 text-white">Trending Episodes</h4>

                        <div className="flex items-center gap-4 sm:mb-0 mb-10">
                            <button onClick={prev} aria-label="Previous episode" className={`h-10 w-10 rounded-full 
                                border border-white/20 bg-white/5 text-white hover:bg-white/15 transition flex 
                                items-center justify-center cursor-pointer`}
                            >
                                <IoIosArrowBack />
                            </button>

                            <button onClick={next} aria-label="Next episode" className={`h-10 w-10 rounded-full 
                                border border-white/20 bg-white/5 text-white hover:bg-white/15 transition flex 
                                items-center justify-center cursor-pointer`}
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>

                    <div ref={trackRef} className="relative select-none" onMouseUp={(e) => onUp(e.clientX)}
                        onMouseDown={(e) => onDown(e.clientX)} onMouseMove={(e) => onMove(e.clientX)}
                        onMouseEnter={onTrackMouseEnter} onMouseLeave={(e) => onTrackMouseLeave(e.clientX)}
                        onTouchStart={(e) => onDown(e.touches[0].clientX)}
                        onTouchMove={(e) => onMove(e.touches[0].clientX)}
                        onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
                    >
                        {items?.length >= 3 && (
                            <div className="grid grid-cols-12 items-center gap-4 md:gap-6">
                                <EpisodeCard item={items[idxLeft]} variant="side"
                                    onClick={() => goToSlide(idxLeft)}
                                />

                                <EpisodeCard item={items[active]} variant="center"
                                    isPlaying={playingVideoId === items[active]?.videoId}
                                    onPlay={() => setPlayingVideoId(items[active]?.videoId || "")}
                                />

                                <EpisodeCard item={items[idxRight]} variant="side"
                                    onClick={() => goToSlide(idxRight)}
                                />
                            </div>
                        )}

                        <div className="mt-7 flex items-center justify-center gap-2.5">
                            {items?.map((_, index) => {
                                const isOn = index === active

                                return (
                                    <button key={index} onClick={() => goToSlide(index)}
                                        className={`h-1.5 rounded-full transition-all
                                            ${isOn ? "w-7 h-2.5 bg-[#F36B21]" : "w-2.5 h-2.5 bg-white"}
                                        `}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                );
                            })}
                        </div>
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

                        <div className="col-span-12 lg:col-span-8 lg:mt-0 mt-4 lg:max-w-165">
                            <h6 className="subhead-1 text-[#F36B21]">
                                Inception to Infinity is a long-form podcast for those building and governing systems.
                                We explore decision mechanics, capital, and organizational design, prioritizing reasoning
                                and trade-offs over sound bites.

                                <span className="text-[#FFFFFF5E]" id="why-we-exist" data-split>
                                    While modern growth rewards speed, speed rarely rewards clarity. We exist to slow
                                    down, questioning assumptions and mapping consequences to understand how intention
                                    becomes structure and structure becomes legacy. We examine the foundations before
                                    organizations scale.
                                </span>
                            </h6>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto">
                    <div className="py-7 overflow-visible sm:overflow-visible md:overflow-visible">
                        <div className="relative flex md:flex-row flex-col justify-center items-center">
                            {PODCAST_EXISTS?.map((data, index) => {
                                const rotation = index === 0 ? "rotate-3" : index === 1 ?
                                    "-rotate-4" : index === 2 ? "rotate-5" : "-rotate-7"

                                const overlap = index !== 0 ? "md:-ml-40 lg:-ml-30 -mt-20 md:mt-0" : "";

                                return (
                                    <div key={index} className={`relative cursor-pointer transition-all duration-300 
                                        ease-in-out will-change-transform hover:z-50 hover:-translate-y-3 active:z-50 
                                        active:-translate-y-2 ${overlap}`}
                                    >
                                        <img src={data?.image} alt={data?.title}
                                            className="w-75 sm:w-100 h-auto object-contain"
                                        />

                                        <div className={`absolute inset-0 lg:px-10 px-8 flex flex-col justify-center 
                                            ${rotation}`}
                                        >
                                            <h5 className="heading-5 text-white md:max-w-45 max-w-35">
                                                {data?.title}
                                            </h5>
                                            <p className="md:mt-3 mt-2 body-2 text-white">{data?.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
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