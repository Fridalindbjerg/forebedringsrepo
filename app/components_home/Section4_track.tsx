"use client";
import "react-h5-audio-player/lib/styles.css";

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
      <div className="flex ">
        <Image src={tracks[activeIndex].img} width={250} height={250} alt="Current Track" />

        {/* Audio Player */}
        <AudioPlayer src={tracks[activeIndex].audio} autoPlay={false} />
      </div>
      <div className="flex">
        <div className="flex place-items-center">
          <FaRegArrowAltCircleLeft onClick={prev} />
        </div>
        <div className="flex  flex-col items-center gap-4">
          {/* Billede */}

          {/* Thumbnails */}
          <div className="flex overflow-x-auto">
            {tracks.map((track, i) => (
              <Image
                key={i}
                src={track.img}
                width={150}
                height={150}
                alt="thumbnail"
                className={`cursor-pointer rounded ${i === activeIndex ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setActiveIndex(i)} // klik på thumbnail = opdater activeIndex
              />
            ))}
          </div>
        </div>
        <div className="flex place-items-center">
          <FaRegArrowAltCircleRight onClick={next} />
        </div>
      </div>
    </section>
  );
}
