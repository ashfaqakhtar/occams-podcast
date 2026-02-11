"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const videos = ["/videos/v1.mp4", "/videos/v2.mp4", "/videos/v3.mp4"];

export default function VideoSlider() {
    const videoRefs = useRef([]);
    const [playing, setPlaying] = useState(null);

    const togglePlay = (index) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (video.paused) {
            video.play();
            setPlaying(index);
        } else {
            video.pause();
            setPlaying(null);
        }
    };

    return (
        <section className="bg-black py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-white text-[20px] font-medium tracking-wide mb-8">
                    Trending Episodes
                </h2>

                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={28}
                    loop={true}
                    autoplay={{
                        delay: 2600,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    className="videoSwiper"
                >
                    {videos.map((src, i) => (
                        <SwiperSlide key={i} className="video-slide">
                            <div className="video-card">
                                <video
                                    ref={(el) => (videoRefs.current[i] = el)}
                                    src={src}
                                    className="video-media"
                                />

                                <div className="video-controls">
                                    <div className="video-controls-left">
                                        <button
                                            onClick={() => togglePlay(i)}
                                            className="control-btn"
                                            aria-label="Play or pause"
                                        >
                                            {playing === i ? (
                                                <svg viewBox="0 0 24 24" className="control-icon">
                                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" className="control-icon">
                                                    <path d="M8 6l10 6-10 6V6z" />
                                                </svg>
                                            )}
                                        </button>
                                        <button className="control-btn" aria-label="Previous">
                                            <svg viewBox="0 0 24 24" className="control-icon">
                                                <path d="M15 6l-6 6 6 6V6z" />
                                            </svg>
                                        </button>
                                        <button className="control-btn" aria-label="Next">
                                            <svg viewBox="0 0 24 24" className="control-icon">
                                                <path d="M9 6l6 6-6 6V6z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="control-btn" aria-label="Settings">
                                        <svg viewBox="0 0 24 24" className="control-icon">
                                            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm9 3.5l-2.2.4a7.4 7.4 0 0 1-.7 1.7l1.3 1.8-2.1 2.1-1.8-1.3a7.4 7.4 0 0 1-1.7.7L12 21l-1-.1-1-.2-.4-2.2a7.4 7.4 0 0 1-1.7-.7l-1.8 1.3-2.1-2.1 1.3-1.8a7.4 7.4 0 0 1-.7-1.7L3 12l.4-2.2a7.4 7.4 0 0 1 .7-1.7L2.8 6.3l2.1-2.1 1.8 1.3a7.4 7.4 0 0 1 1.7-.7L12 3l2.2.4a7.4 7.4 0 0 1 1.7.7l1.8-1.3 2.1 2.1-1.3 1.8a7.4 7.4 0 0 1 .7 1.7L21 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
