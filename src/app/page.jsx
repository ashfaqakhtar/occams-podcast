"use client";
import Link from "next/link";
import Image from "next/image";
import VideoSlider from "@/components/VideoSlider";
import StatsWave from "@/components/StatsWave";
import CardStack from "@/components/CardStack";

export default function Home() {
  return (
    <>
      <section className="hero-section h-screen flex justify-center items-center relative ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <div></div>
            <div>
              <small className="text-white font-inter text-[1.375rem] font-light leading-7.5">A podcast by Powered Occams Digital </small>
              <h1 className="py-4 text-white font-inter text-[4.375rem] font-medium leading-19.5 tracking-[-0.13125rem]">Inception to Infinity</h1>
              <p className="text-white font-inter text-lg font-light leading-7.5">Strategic conversations with founders, CEOs, and industry builders, tracing how bold ideas move from inception to lasting, real-world impact through decisive moments and hard-won insight.</p>
            </div>
          </div>
        </div>

        <div className="container absolute left-[15%] bottom-10  mx-auto px-4 w-fit">
          <div className="grid grid-cols-1 ">
            <div className="rounded-[3rem] bg-white/10 backdrop-blur-[23.4px] pt-1.75 pr-8.25 pb-4.25 pl-9">
              <small>Listen on:</small>
              <div className="flex gap-4">
                <Link href={""}><Image className="w-auto" src="/logo/podcast-1.svg" alt="podcast" width={0} height={40} priority /></Link>
                <Link href={""}><Image className="w-auto" src="/logo/spotify-1.svg" alt="Spotify" width={0} height={40} priority /></Link>
                <Link href={""}><Image className="w-auto" src="/logo/youtube-1.svg" alt="youtube" width={0} height={40} priority /></Link>
                <Link href={""}><Image className="w-auto" src="/logo/exclude.svg" alt="exclude" width={0} height={40} priority /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSlider />

      <StatsWave />

     
    </>
  );
}

