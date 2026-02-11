"use client";

export default function StatsWave() {
    const bars = [
        {
            width: "w-[44px]",
            height: "h-[86px]",
            color: "bg-[#C96A2C]",
            delay: "0s",
            duration: "3.4s",
        },
        {
            width: "w-[120px]",
            height: "h-[300px]",
            color: "bg-[#FFC29E]",
            value: "50+",
            label: "Episodes",
            delay: "0.1s",
            duration: "3.6s",
        },
        {
            width: "w-[50px]",
            height: "h-[150px]",
            color: "bg-[#E8844E]",
            delay: "0.2s",
            duration: "3.8s",
        },
        {
            width: "w-[120px]",
            height: "h-[240px]",
            color: "bg-[#F7A36D]",
            value: "10K+",
            label: "Listeners",
            delay: "0.3s",
            duration: "4s",
        },
        {
            width: "w-[56px]",
            height: "h-[230px]",
            color: "bg-[#C56A34]",
            delay: "0.4s",
            duration: "4.2s",
        },
        {
            width: "w-[120px]",
            height: "h-[250px]",
            color: "bg-[#F26F21]",
            value: "4.9",
            label: "Rating",
            delay: "0.5s",
            duration: "4.4s",
        },
        {
            width: "w-[56px]",
            height: "h-[230px]",
            color: "bg-[#C56A34]",
            delay: "0.6s",
            duration: "4.2s",
        },
        {
            width: "w-[58px]",
            height: "h-[140px]",
            color: "bg-[#F0B086]",
            delay: "0.7s",
            duration: "4s",
        },
        {
            width: "w-[56px]",
            height: "h-[150px]",
            color: "bg-[#C96A2C]",
            delay: "0.8s",
            duration: "3.8s",
        },
        {
            width: "w-[54px]",
            height: "h-[120px]",
            color: "bg-[#C56A34]",
            delay: "0.9s",
            duration: "3.6s",
        },
        {
            width: "w-[44px]",
            height: "h-[86px]",
            color: "bg-[#B85C22]",
            delay: "1s",
            duration: "3.4s",
        },
    ];

    return (
        <section className="bg-black py-24 min-h-90 flex justify-center items-center overflow-hidden">
            <div className="flex items-center gap-4.5 container mx-auto px-4 justify-between">
                {bars.map((bar, i) => (
                    <div
                        key={i}
                        style={{
                            animationDelay: bar.delay,
                            animationDuration: bar.duration,
                        }}
                        className={`${bar.color} ${bar.width} ${bar.height} rounded-full flex flex-col justify-center items-center text-white wave-bar`}
                    >
                        {bar.value && (
                            <>
                                <h3 className="text-[44px] leading-none font-medium">
                                    {bar.value}
                                </h3>
                                <p className="text-[16px] mt-2 opacity-90">
                                    {bar.label}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
