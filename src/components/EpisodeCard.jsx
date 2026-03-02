import Link from 'next/link';
import React, { Fragment } from 'react'

const EpisodeCard = ({ item, variant = "side", onClick, isPlaying = false, onPlay }) => {
    const isCenter = variant === "center";
    const hasVideo = Boolean(item?.videoId);
    const playerUrl = hasVideo ? `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1` : "";

    if (isCenter) {
        return (
            <div className="col-span-12 sm:col-span-4 md:col-span-4">
                <div className={`relative block overflow-hidden rounded-2xl border border-[#454545] bg-white/5 
                    h-52 sm:h-60 md:h-70`}
                >
                    {hasVideo && isPlaying ? (
                        <iframe src={playerUrl} title={item?.title || "Episode Video"} allowFullScreen
                            className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                            gyroscope; picture-in-picture; web-share"
                        />
                    ) : (
                        <Fragment>
                            <img src={item?.thumb} alt={item?.title} draggable={false}
                                className="h-full w-full object-cover"
                            />

                            {hasVideo && (
                                <button type="button" onClick={onPlay} aria-label={`Play ${item?.title || "episode"}`}
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                >
                                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full 
                                        text-lg bg-black/60 text-white`}
                                    >
                                        ▶
                                    </span>
                                </button>
                            )}
                        </Fragment>
                    )}

                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#F36B2140]" />
                </div>
            </div>
        );
    }

    return (
        <div className={`col-span-12 sm:col-span-4 ${isCenter ? "md:col-span-4" : "md:col-span-4"}`}>
            <Link href={item.href} className={` group relative block overflow-hidden rounded-2xl 
                border border-[#454545] bg-white/5 ${isCenter ? "h-52 sm:h-60 md:h-70" :
                    "h-45 sm:h-52 md:h-60 opacity-75 hover:opacity-90"}`}
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

                {/* <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="caption-1 text-white line-clamp-1">
                        {item.title}
                    </span>
                </div> */}

                {isCenter && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#F36B2140]" />
                )}
            </Link>
        </div>
    )
}

export default EpisodeCard