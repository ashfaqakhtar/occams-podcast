"use client";

import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import BtnComponent from "./BtnComponent";

const Playlist = ({ mode = "page" }) => {
    const API_KEY = "AIzaSyCyzvB_9VsSK6KkOnnfJqDVwerLCrzmMLQ";
    const PLAYLIST_ID = "PL0otti7bMXnhOmIJRafqAPDfrAfGq2MP_";

    const [loading, setLoading] = useState(true);
    const [allVideos, setAllVideos] = useState([]);
    const [durations, setDurations] = useState({});
    const [error, setError] = useState("");

    const [perPage, setPerPage] = useState(9);
    const [page, setPage] = useState(1);

    const isHome = mode === "home";

    const http = useMemo(() => {
        return axios.create({
            baseURL: "https://www.googleapis.com/youtube/v3",
            timeout: 15000,
        });
    }, []);

    const getErrMsg = (e) => {
        if (axios.isAxiosError(e)) {
            const status = e.response?.status;
            const apiMsg = e.response?.data?.error?.message || e.response?.data?.message || e.message;

            if (status === 403) return `API quota/permission issue (403): ${apiMsg}`;
            if (status === 400) return `Bad request (400): ${apiMsg}`;
            if (status === 404) return `Not found (404): ${apiMsg}`;
            if (e.code === "ECONNABORTED") return "Request timeout. Please try again.";
            return apiMsg || "Request failed. Please try again.";
        }
        return "Something went wrong. Please try again.";
    };

    const formatDuration = (data) => {
        const time = data?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!time) return "";
        const hours = Number(time[1] || 0);
        const min = Number(time[2] || 0);
        const sec = Number(time[3] || 0);
        if (hours) return `${hours} hours ${min} min`;
        if (min) return `${min} min`;
        return `${sec} sec`;
    };

    const fetchDurations = async (videoIds) => {
        try {
            if (!videoIds?.length) return;

            const missing = videoIds.filter((id) => !durations[id]);
            if (!missing.length) return;

            const chunk = missing.slice(0, 50);

            const { data } = await http.get("/videos", {
                params: {
                    part: "contentDetails",
                    id: chunk.join(","),
                    key: API_KEY,
                },
            });

            const map = {};
            (data?.items || []).forEach((item) => {
                map[item?.id] = formatDuration(item?.contentDetails?.duration);
            });

            setDurations((prev) => ({ ...prev, ...map }));
        } catch (e) {
            console.warn("Duration fetch failed:", getErrMsg(e));
        }
    };

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError("");

            if (isHome) {
                setPerPage(3); setPage(1);
            }

            try {
                let token = "";
                let collected = [];

                while (true) {
                    const { data } = await http.get("/playlistItems", {
                        params: {
                            part: "snippet,contentDetails",
                            maxResults: 50, playlistId: PLAYLIST_ID,
                            key: API_KEY, ...(token ? { pageToken: token } : {}),
                        },
                    });

                    const items = (data?.items || [])?.map((it) => {
                        const sn = it.snippet;
                        return {
                            videoId: it.contentDetails?.videoId,
                            title: sn?.title || "",
                            desc: sn?.description || "",
                            thumb:
                                sn?.thumbnails?.maxres?.url || sn?.thumbnails?.high?.url ||
                                sn?.thumbnails?.medium?.url || sn?.thumbnails?.default?.url,
                            publishedAt: sn?.publishedAt ? new Date(sn.publishedAt) : null,
                        };
                    })
                        .filter((v) => {
                            if (!v.videoId) return false;
                            const t = (v.title || "").toLowerCase();
                            if (t === "private video" || t === "deleted video") return false;
                            return true;
                        });

                    collected = collected.concat(items);

                    token = data.nextPageToken || "";
                    if (!token) break;

                    if (isHome && collected.length >= 3) break;
                }

                if (cancelled) return;
                if (isHome) collected = collected.slice(0, 3);

                setAllVideos(collected);
                setPage(1);
            } catch (e) {
                if (cancelled) return;
                setError(getErrMsg(e));
                setAllVideos([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [http, API_KEY, PLAYLIST_ID, isHome]);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(allVideos.length / perPage));
    }, [allVideos.length, perPage]);

    useEffect(() => {
        if (!isHome) setPage(1);
    }, [perPage, isHome]);

    const pageVideos = useMemo(() => {
        if (isHome) return allVideos.slice(0, 3);
        const start = (page - 1) * perPage;
        return allVideos.slice(start, start + perPage);
    }, [allVideos, page, perPage, isHome]);

    useEffect(() => {
        if (!pageVideos.length) return;
        fetchDurations(pageVideos.map((v) => v.videoId).filter(Boolean));
    }, [pageVideos]);

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const goPrev = () => goToPage(page - 1);
    const goNext = () => goToPage(page + 1);

    const pageButtons = useMemo(() => {
        const WINDOW = 3;
        const half = 2;

        if (totalPages <= WINDOW)
            return Array.from({ length: totalPages }, (_, i) => i + 1);

        let start = page - half;
        let end = page + half;

        if (start < 1) {
            start = 1;
            end = WINDOW;
        }
        if (end > totalPages) {
            end = totalPages;
            start = totalPages - WINDOW + 1;
        }

        const out = [];
        if (start > 1) {
            out.push(1);
            if (start > 2) out.push("...");
        }
        for (let i = start; i <= end; i++) out.push(i);
        if (end < totalPages) {
            if (end < totalPages - 1) out.push("...");
            out.push(totalPages);
        }
        return out;
    }, [totalPages, page]);

    return (
        <Fragment>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                {loading ? Array.from({ length: isHome ? 3 : 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <div className="aspect-video animate-pulse bg-white/10" />
                        <div className="p-5">
                            <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
                            <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/10" />
                            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-white/10" />
                            <div className="mt-5 flex gap-3">
                                <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
                                <div className="h-9 w-28 animate-pulse rounded-full bg-white/10" />
                            </div>
                        </div>
                    </div>
                )) : pageVideos.map((data) => {
                    const dateText = data?.publishedAt && data?.publishedAt.toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                    });
                    const dur = durations[data?.videoId] || "…";

                    return (
                        <div key={data?.videoId} className="flex flex-col gap-5 items-stretch">
                            <div className="rounded-2xl border-2 border-[#F36B2140]">
                                <img src={data?.thumb} alt={data?.title} loading="lazy"
                                    className="rounded-2xl h-full w-full object-cover"
                                />
                            </div>

                            <div className={`group py-7 px-6 rounded-2xl border-2 border-[#F36B2140] bg-[#341606]
                                flex flex-col h-full justify-between`}
                            >
                                <div className="flex flex-col">
                                    <p className={`inline-flex w-max rounded-full px-4 py-1.5 border-[0.5px]
                                        caption-2 text-white border-[#FFFFFF5E]`}
                                    >
                                        Leadership
                                    </p>

                                    <h6 className="heading-6 mt-3 text-white">{data?.title}</h6>
                                </div>

                                <div className="flex flex-col">
                                    <p className="mt-5 body-3 text-white opacity-50 line-clamp-3">
                                        {data?.desc || "—"}
                                    </p>

                                    <div className="mt-4 flex items-center gap-8 body-3 text-white">
                                        <span>{dateText}</span>
                                        <div className="flex items-center gap-2">
                                            <img src="/logo/clock.svg" alt="Clock" className="w-5 h-5" />
                                            <span className="mt-0.5px">{dur}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex sm:flex-row flex-col sm:items-center gap-3.5">
                                        <BtnComponent btn_title={'Play Episode'} bgColor="bg-[#F36B21]"
                                            textColor="text-white" className="py-1.5 cta-2 sm:w-30 w-36"
                                            btn_url={`https://www.youtube.com/watch?v=${data?.videoId}`}
                                        />

                                        <button onClick={() => alert("Transcript: YouTube API se direct")}
                                            className={`inline-flex flex-nowrap py-1.5 cta-2 text-white bg-[#656565]
                                            w-36 items-center rounded-full justify-center whitespace-nowrap gap-2.5 
                                            cursor-pointer`}
                                        >
                                            Show Transcript
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {!isHome && !error && (
                <Fragment>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button
                            onClick={goPrev}
                            disabled={page <= 1 || loading}
                            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
                            aria-label="Previous"
                        >
                            ‹
                        </button>

                        <div className="flex items-center gap-2">
                            {pageButtons.map((p, idx) => {
                                if (p === "...") {
                                    return (
                                        <span key={`dots-${idx}`} className="px-2 text-white/40">
                                            …
                                        </span>
                                    );
                                }
                                const isActive = p === page;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => goToPage(p)}
                                        className={[
                                            "h-10 min-w-10 rounded-full px-4 text-sm transition",
                                            isActive
                                                ? "bg-[#ff6a00] text-black"
                                                : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                                        ].join(" ")}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={goNext}
                            disabled={page >= totalPages || loading}
                            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
                            aria-label="Next"
                        >
                            ›
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-white/50">Per page:</span>
                            <select
                                value={perPage}
                                onChange={(e) => setPerPage(Number(e.target.value))}
                                className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 outline-none"
                            >
                                <option value={6}>6</option>
                                <option value={9}>9</option>
                                <option value={12}>12</option>
                                <option value={18}>18</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-3 text-center text-xs text-white/40">
                        Page <span className="text-white/70">{page}</span> of{" "}
                        <span className="text-white/70">{totalPages}</span> • Visible
                        videos <span className="text-white/70">{allVideos.length}</span>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Playlist