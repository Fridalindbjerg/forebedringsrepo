"use client";

import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { forwardRef, useState, useEffect } from "react";
import { LuSquareArrowLeft, LuSquareArrowRight } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

// TypeScript interface
export interface Picture {
  id: number;
  description: string;
  asset: { url: string };
}

interface Props {
  gallery: Picture[];
}

// modalpopup hentet fra https://motion.dev/examples/react-use-presence-data?platform=react
// indsat i chapGPT med det hardcodede galleri

export default function GalleryWithFramerModal({ gallery }: Props) {
  // Styrer om modal-vinduet er åbent (true) eller lukket (false)
  const [isOpen, setIsOpen] = useState(false);

  // Holder styr på hvilket billede i galleriet der er aktivt (0 = første billede)
  const [selectedIndex, setSelectedIndex] = useState(0);

  /*
   * Styrer retningen på animationen. - 1 betyder "fremad",  -1 betyder "bagud".
   * Det er en TypeScript union type: <1 | -1>. Betyder state må KUN være 1 eller -1. */
  const [direction, setDirection] = useState<1 | -1>(1);

  /**
   * 'index' kommer fra det billede man klikker på i galleriet. Sætter hvilket billede der skal vises i modal */
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  /**
   * Skifter billede i modal-slideshowet
   * 'dir' bestemmer om det enten er fremad (1) eller bagud (-1)
   * wrap(...) sørger for at vi "wrap-around":
   *  Hvis man går frem fra sidste billede → går man tilbage til første
   *  Hvis man går tilbage fra første → hopper man til sidste
   * giver en uendelig looping
   */
  const changeSlide = (dir: 1 | -1) => {
    const nextIndex = wrap(0, gallery.length, selectedIndex + dir);

    // Opdater billedet
    setSelectedIndex(nextIndex);
    // Fortæller animationen hvilken retning vi swiper i
    setDirection(dir);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Tilføj event listener når modal er åben
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    // Ryd op når modal lukkes / komponent unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]); // Kører når isOpen ændrer sig

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr_1fr] ">
        {gallery.slice(0, 4).map((pic, i) => (
          <motion.div
            key={pic.id}
            className="relative group w-full h-[250px]" // relative + group + height
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.125 }}
          >
            {/* Trekanter */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink) opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
            <div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-(--pink) opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

            {/* Billede */}
            <div className="w-full h-full relative cursor-pointer hover:border-y-2 border-(--pink) duration-300 z-0" onClick={() => openModal(i)}>
              <Image src={pic.asset.url} alt={pic.description || "Image"} fill className="object-cover w-full h-auto" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {gallery.slice(4, 7).map((pic, i) => (
          <motion.div key={pic.id} className="relative group w-full h-[250px]" initial={{ opacity: 0, x: -70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.125 }}>
            {/* Trekanter */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink) opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
            <div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-(--pink) opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

            {/* Billede */}
            <div className="w-full h-full relative cursor-pointer hover:border-y-2 border-(--pink) duration-300 z-0" onClick={() => openModal(i + 4)}>
              <Image src={pic.asset.url} alt={pic.description || "Image"} fill className="object-cover w-full h-auto" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-2xl z-50 cursor-pointer">
            <RxCross2 size={40} />
          </button>

          <div className="relative">
            {/* med onClick og changeSlide til at skifte billede */}
            <motion.button onClick={() => changeSlide(-1)} className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer">
              <LuSquareArrowLeft />
            </motion.button>

            <AnimatePresence
              custom={direction} // Giver 'direction' til animationerne
              initial={false} // Forhindrer at der køres initial-animation ved første render
              mode="popLayout" // Sørger for at elementet fjernes og det nye animeres ind pænt
            >
              {/* 
              Slide-komponenten bliver re-mountet hver gang 'selectedIndex' ændrer sig.
              'key' er MEGET vigtigt! Uden den ved Framer Motion ikke,
              hvornår et billede er "nyt" → derfor ingen exit/enter animation.
              */}
              <Slide
                key={gallery[selectedIndex].id} // Tvinger Motion til at animate mellem billeder
                picture={gallery[selectedIndex]} // Det aktuelle billede
                custom={direction} // Sender swipe-retningen ned til Slide komponenten
              />
            </AnimatePresence>

            <motion.button onClick={() => changeSlide(1)} className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer">
              <LuSquareArrowRight />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

// forwardRef bruges for at framer-motion kan få en reference til DOM-elementet,
// når komponenten bruges inde i AnimatePresence.
const Slide = forwardRef(function Slide({ picture, custom }: { picture: Picture; custom: number }, ref: React.Ref<HTMLDivElement>) {
  //   // Henter "direction" for animationen fra AnimatePresence.
  //   // Den bruges til at vide om vi skal animere venstre→højre eller højre→venstre.
  const direction = usePresenceData();
  return (
    // <motion.div ref={ref} initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3 } }} exit={{ opacity: 0, x: direction * -50 }} custom={custom} className="max-w-[80vw] max-h-[80vh] w-auto h-auto overflow-hidden ">
    //   <div className="border-b-2 border-(--pink) relative">
    //     <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink)" />

    //     <img src={picture.asset.url} alt={picture.description} className="w-full h-full object-contain" />
    //   </div>
    // </motion.div>
    <motion.div ref={ref} initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3 } }} exit={{ opacity: 0, x: direction * -50 }} custom={custom} className="max-w-[80vw] max-h-[80vh] w-auto h-auto overflow-hidden">
      <div className="border-b-2 border-(--pink) relative w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-(--pink)" />
          <Image
            src={picture.asset.url}
            alt={picture.description}
            width={800} // px eller dynamisk
            height={600}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
});
