"use client";
// import af audio player fra online bibliotek
import "react-h5-audio-player/lib/styles.css";
import Index_h2 from "./Index_h2";


import { useState } from "react";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Definerer array af tracks med billede, lydfil og titel
const baseTracks = [
  { img: "/assets/content-img/track1.jpg", audio: "/assets/media/black-box-funky.mp3", title: "Black Box Funky" },
  { img: "/assets/content-img/track2.jpg", audio: "/assets/media/euphoria.mp3", title: "Euphoria" },
  { img: "/assets/content-img/track4.jpg", audio: "/assets/media/fashion-red-tape.mp3", title: "Fashion Red Tape" },
  { img: "/assets/content-img/track5.jpg", audio: "/assets/media/euphoria.mp3", title: "Euphoria" },
];

// gentag tracks hvis vi skal have flere
const tracks = Array(6).fill(baseTracks).flat();

// Carousel komponent - scroll gennem tracks
export default function TrackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // næste track
  const next = () => {
    setActiveIndex((i) => (i + 1) % tracks.length);
  };

  // forrige track
  const prev = () => {
    setActiveIndex((i) => (i - 1 + tracks.length) % tracks.length);
  };

  return (
    <section
      className="grid grid-cols-subgrid col-[full-start/full-end] grid-rows-[auto_auto_auto]">
      <div className="col-[content-start/content-end] row-start-1">
        <Index_h2 text="Night club track" />
        {/* Laver sammenhæng mellem billede og aktive track */}
        <div className="flex">
          <Image src={tracks[activeIndex].img} width={250} height={250} alt="Current Track" className="hidden sm:flex h-auto w-auto" />
          <AudioPlayer src={tracks[activeIndex].audio} autoPlay={false} header={<div className="uppercase font-semibold">{tracks[activeIndex].title}</div>} className="player-dark flex-1" showSkipControls showJumpControls={false} />
        </div>
      </div>

      {/* forrige track knap */}
      <button onClick={prev} className="hidden md:flex border border-white scale-x-[-1] p-2 col-[full-start/content-start] row-start-2 self-center justify-self-end mr-2">
        <Image width={10} height={10} src="/assets/icon/play.svg" alt="Forrige sang" className="cursor-pointer w-auto h-auto" />
      </button>

      {/* "galleri" */}
      <div className="col-[content-start/content-end] row-start-2">
        <div className="flex w-full justify-center md:justify-start overflow-x-auto">
          {tracks.map((track, i) => {
            const isActive = i === activeIndex;

            return (
              <div key={i} onClick={() => setActiveIndex(i)} className={`relative shrink-0 cursor-pointer
            ${isActive ? "block mx-auto" : "hidden"} < md: kun aktiv + centreret  md:block md:mx-0  ≥ md: vis alle som før 
          `}>
                <Image src={track.img} width={500} height={500} alt="thumbnail" className="w-full md:w-auto h-auto object-cover" />
                {/* Aktive track overlay */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Image src="/assets/icon/Play_btn.svg" width={60} height={60} alt="Play Icon" className="w-auto h-auto" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white px-3 py-2 text-center text-sm font-semibold truncate">{track.title}</div>

                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink)" />
                    <div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-(--pink)" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* næste track knap */}
      <button onClick={next} className="hidden md:flex border border-white p-2 col-[content-end/full-end] row-start-2 self-center justify-self-start ml-2">
        <Image width={10} height={10} src="/assets/icon/play.svg" alt="Næste video" className="cursor-pointer w-auto h-auto" />
      </button>

      {/* knapper mobilformat */}
      <div className="col-[content-start/content-end] row-start-3 md:hidden flex justify-center gap-5 mt-4 ">
        <button
          onClick={prev}
          aria-label="Forrige sang"
          className="w-7 h-7 border border-white grid place-items-center"
        >
          <Image width={10} height={10} src="/assets/icon/play.svg" alt="Forrige sang" className="w-auto h-auto" />
        </button>

        <button
          onClick={next}
          aria-label="Næste sang"
          className="w-7 h-7 border border-white grid place-items-center p2"
        >
          <Image width={10} height={10} src="/assets/icon/play.svg" alt="Næste sang" className="w-auto h-auto" />
        </button>
      </div>
    </section>
  );
}
