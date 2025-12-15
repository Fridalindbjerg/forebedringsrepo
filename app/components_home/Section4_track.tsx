"use client";
import "react-h5-audio-player/lib/styles.css";
import Index_h2 from "./Index_h2";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const baseTracks = [
  { img: "/assets/content-img/track1.jpg", audio: "/assets/media/black-box-funky.mp3" },
  { img: "/assets/content-img/track2.jpg", audio: "/assets/media/euphoria.mp3" },
  { img: "/assets/content-img/track4.jpg", audio: "/assets/media/fashion-red-tape.mp3" },
  { img: "/assets/content-img/track5.jpg", audio: "/assets/media/euphoria.mp3" },
];

// gentag tracks hvis du vil have flere
const tracks = Array(6).fill(baseTracks).flat(); // fx 24 tracks

export default function TrackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((i) => (i + 1) % tracks.length); // næste track
  };

  const prev = () => {
    setActiveIndex((i) => (i - 1 + tracks.length) % tracks.length); // forrige track
  };

  return (
    <section className="grid grid-cols">
      <Index_h2 text="Night club track" />
      <div className="flex  ">
        <Image src={tracks[activeIndex].img} width={250} height={250} alt="Current Track" className="hidden sm:flex" />

        {/* Audio Player */}
        <AudioPlayer src={tracks[activeIndex].audio} autoPlay={false} />
      </div>
      <div className="flex">
        <div className="flex place-items-center ">
          <FaRegArrowAltCircleLeft onClick={prev} />
        </div>
        <div className="flex flex-col items-center ">
          <div className="flex overflow-x-auto w-full">
            {tracks.map((track, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative group shrink-0 cursor-pointer 
  
    ${isActive ? "block" : "hidden"} sm:block sm:mx-0
  `}
                >
                  <Image src={track.img} loading="eager" width={500} height={500} alt="thumbnail" className="w-full h-auto object-cover " />
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Image src="/assets/icon/Play_btn.svg" width={60} height={60} alt="Play Icon" />
                    </div>
                  )}

                  {/* Triangles */}
                  {isActive && (
                    <>
                      {/* Bottom-right triangle */}
                      <div
                        className="
                                  absolute bottom-0 right-0
                                  w-0 h-0
                                  border-l-30 border-l-transparent
                                  border-b-30 border-b-(--pink)
                                  opacity-100 
                                  pointer-events-none"
                      />

                      {/* Top-left triangle */}
                      <div
                        className="
          absolute top-0 left-0
          w-0 h-0
          border-r-30 border-r-transparent
          border-t-30 border-t-(--pink)
          opacity-100 
          pointer-events-none
        "
                      />
                      <div></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex place-items-center">
          <FaRegArrowAltCircleRight onClick={next} />
        </div>
      </div>
    </section>
  );
}
