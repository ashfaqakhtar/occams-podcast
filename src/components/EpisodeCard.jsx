import Link from 'next/link';
import React from 'react'

const EpisodeCard = ({ item, variant = "side", onClick, isPlaying = false, onPlay }) => {
    const isCenter = variant === "center";
    const hasVideo = Boolean(item?.videoId);
    const playerUrl = hasVideo
        ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`
        : "";

    if (isCenter) {
        return (
            <div className="col-span-12 sm:col-span-4 md:col-span-4">
                <div className="relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-52 sm:h-58 md:h-64">
                    {hasVideo && isPlaying ? (
                        <iframe
                            src={playerUrl}
                            title={item?.title || "Episode Video"}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <React.Fragment>
                            <img src={item?.thumb} alt={item?.title} draggable={false}
                                className="h-full w-full object-cover"
                            />

                            {hasVideo && (
                                <button
                                    type="button"
                                    onClick={onPlay}
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                    aria-label={`Play ${item?.title || "episode"}`}
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white text-lg">
                                        ▶
                                    </span>
                                </button>
                            )}

                            <div className="absolute bottom-3 left-3 right-3">
                                <span className="text-[11px] text-white/90 line-clamp-1">
                                    {item?.title}
                                </span>
                            </div>
                        </React.Fragment>
                    )}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#F36B2140]" />
                </div>
            </div>
        );
    }

    return (
        <div className={`col-span-12 sm:col-span-4 ${isCenter ? "md:col-span-4" : "md:col-span-4"}`}>
            <Link href={item.href} className={` group relative block overflow-hidden rounded-2xl 
                border border-white/10 bg-white/5 ${isCenter ? "h-52 sm:h-58 md:h-64" :
                    "h-43 sm:h-48 md:h-54 opacity-75 hover:opacity-90"}`}
                onClick={(e) => {
                    if (!isCenter) {
                        e.preventDefault(); onClick?.();
                    }
                }}
            >
                <div className="absolute inset-0">
                    <img src={item.thumb} alt={item.title} draggable={false} className={`h-full w-full object-cover 
                        transition duration-500 ${isCenter ? "group-hover:scale-[1.03]" : "scale-[1.02] blur-[0px]"}`}
                    />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex h-7 w-7 items-center justify-center 
                            rounded-full bg-black/55 text-white/80 text-[11px]`}
                        >
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

                {isCenter && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#F36B2140]" />
                )}
            </Link>
        </div>
    )
}

export default EpisodeCard
