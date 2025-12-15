"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Typescript interface
interface Events {
  id: number;
  title: string;
  description: string;
  date: string;
  asset: { url: string };
  location: string;
}

interface Props {
  events: Events[];
}

export default function EventsCaroussel({ events }: Props) {
  // Holder styr på hvilket slide der vises
  const [index, setIndex] = useState(0);

  // Hvor mange event-kort pr. slide
  const itemsPerSlide = 2;

  // Split events op i arrays af 2 (2 per slide)
  const slides = [];
  for (let i = 0; i < events.length; i += itemsPerSlide) {
    slides.push(events.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="w-full ">
      {/* Framer Motion gør at slides animeres ind/ud */}
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 justify-items-center">
          {/* Loop igennem de events der hører til det aktive slide */}
          {slides[index].map((event) => {
            // Splitter dato og tidspunk ad for bedre visning
            const clean = event.date.replace(".000Z", " PM ");
            const [datePart, timePart] = clean.split("T");

            return (
              <section key={event.id} className="w-full cursor-pointer">
                <div className="relative group">
                  {/* trekanter */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-r-70 border-r-transparent border-t-70 border-t-(--pink) opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-70 border-l-transparent border-b-70 border-b-(--pink) opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  <div className="group relative overflow-hidden h-full">
                    {/* Billede */}

                    <Image
                      src={event.asset.url}
                      alt="Event image"
                      width={900} // specifik bredde
                      height={900} // specifik højde
                      className="object-cover w-full h-auto"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity grid grid-cols-3 grid-rows-[auto_1fr_1fr] text-white">
                      <div className="col-start-2 row-start-2 place-self-center">
                        <button className="bg-(--pink) px-5 py-3 font-bold self-start cursor-pointer">Book now</button>
                      </div>

                      <div className="col-span-3 row-start-3 p-5 self-end bg-black">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="mt-2 text-sm">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* pink boks */}
                <div className="bg-(--pink) text-white px-6 py-3 flex gap-8 text-sm font-semibold">
                  <span>{datePart}</span>
                  <span>{timePart}</span>
                  <span>{event.location}</span>
                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Pagination - knapper */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 ${i === index ? "bg-(--pink)" : "bg-white"}`} />
        ))}
      </div>
    </section>
  );
}
