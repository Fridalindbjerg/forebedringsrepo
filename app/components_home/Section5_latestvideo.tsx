"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import Index_h2 from "./Index_h2";

// TypeScript interface
interface VideoItem {
    id: number;
    video: string;
    description: string;
}
// Array af videoer med description
const videos: VideoItem[] = [
    { id: 1, video: "/assets/media/video-crowd.mp4", description: "Video 1" },
    { id: 2, video: "/assets/media/video-dj-crowd-2.mp4", description: "Video 2" },
    { id: 3, video: "/assets/media/video-dj-crowd1.mp4", description: "Video 3" },
];

export default function VideoCarousel() {
    // Index for den aktuelle video, som vises
    const [index, setIndex] = useState(0);
    // Retningen vi swiper i: 1 = næste, -1 = forrige (bruges til animation)
    const [direction, setDirection] = useState<1 | -1>(1);

    // Funktion til at gå til næste video
    const next = () => {
        // sæt retningen til "fremad"
        setDirection(1);
        // wrap-around: går tilbage til første video hvis sidste er nået
        setIndex((i) => wrap(0, videos.length, i + 1));
    };
    // Funktion til at gå til forrige video
    const prev = () => {
        setDirection(-1);
        setIndex((i) => wrap(0, videos.length, i - 1));
    };

    return (
        <section className="grid grid-cols-subgrid col-[full-start/full-end]">

            <h2 className="col-[content-start/content-end]">
                <Index_h2 text="Latest video" />
            </h2>

            <div className="col-[content-start/content-end] grid place-items-center gap-4 mt-10">

                {/* Slide */}
                <div className="w-full aspect-video overflow-hidden relative">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <VideoSlide key={videos[index].id} video={videos[index]} custom={direction} />
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-center gap-5 mt-8">
                    {/* LEFT ARROW */}
                    <button onClick={prev} className=" border border-white scale-x-[-1] p-2">
                        <Image width={10} height={10} src="/assets/icon/play.svg" alt="Forrige video" className="cursor-pointer w-full h-auto" />
                    </button>

                    {/* RIGHT ARROW */}
                    <button onClick={next} className=" border border-white p-2">
                        <Image width={10} height={10} src="/assets/icon/play.svg" alt="Næste video" className="cursor-pointer w-full h-auto" />
                    </button>
                </div>
            </div>
        </section>
    );
}

// Enkelt slide-komponent, som viser en video
const VideoSlide = forwardRef(function VideoSlide({ video, custom }: { video: VideoItem; custom: number }, ref: React.Ref<HTMLDivElement>) {
    // Framer Motion hook, som giver retningen for animationen
    const direction = usePresenceData();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3 } }}
            exit={{ opacity: 0, x: direction * -80 }}
            custom={custom}
            className="absolute top-0 left-0 w-full h-full"
        >
            {/* Trekanter */}
            <div className="absolute top-0 left-0 w-0 h-0 border-r-50 border-r-transparent border-t-50 border-t-(--pink)" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-50 border-l-transparent border-b-50 border-b-(--pink)" />

            <video src={video.video} className="w-full h-full object-cover" autoPlay loop playsInline />
        </motion.div>
    );
});
