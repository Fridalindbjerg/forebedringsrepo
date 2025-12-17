"use client";

import Image from "next/image";

import { motion } from "framer-motion";

type Props = {
  image: string;
  title: string;
  text: string;
  icon: string;
};

// Definerer tiderne for aniamtionerne
const Time = { duration: 1.5, ease: "easeOut" as const };
const Fast = { duration: 0.6, ease: "easeOut" as const };

export default function Card({ image, title, text, icon }: Props) {
  return (
    // i denne framer-motion bruger vi tilstandende: rest og hover.
    // "rest" er når bruger ikke rør card
    // hover er naturligvis ved hover :-)

    <motion.div
      className="relative group grid"
      // initial="rest": når komponent først indlæses er state = rest
      initial="rest"
      // animate="rest": sikrer at komponent altid er i rest når der ikke interageres med det (kan godt udelades, men er godt at have)
      animate="rest"
      //  whileHover="hover": ved hover-state skiftes til tilstand: hover. Logisk. Her "afspilles" alle animerede effekter.
      whileHover="hover"
      //  whileTap="hover": gør i princippet samme som "whileHover", men reagerer på tap - altså devices med touch funktion (telefon, ipad osv)
      whileTap="hover"
    >
      {/* billede */}
      <Image src={image} alt={title} width={1200} height={800} className="row-start-1 col-start-1 w-full h-full object-cover" />

      {/* OVERLAY VED HOVER */}

      {/* "overlay div" - Første div styrer mørkt overlay/baggrund */}
      <motion.div
        className="row-start-1 col-start-1 w-full h-full bg-black/90 opacity-0 group-hover:opacity-100"
        variants={{
          // kort forklaring: state rest= sort overlay ikke synligt, state hover = sort overlay synligt
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={Fast}
      />

      {/*"content div" - Ekstra div til alt indhold - nødvendigt da denne skal have flex, for at positionere ikon, trekanter, h3 og p*/}
      <motion.div
        className="row-start-1 col-start-1 w-full h-full px-6 flex flex-col items-center justify-center text-center opacity-0  group-hover:opacity-100 transition-all "
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={Time}
      >
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center rounded-md p-4 border-2 border-(--pink)">
          <Image src={icon} alt="" width={48} height={48} className="w-12 h-12 object-contain" />
        </div>

        {/* Tekst h3 + p */}
        <motion.h3
          className="text-white text-2xl font-semibold mb-2"
          variants={{
            rest: { opacity: 0, scale: 0.9 },
            hover: { opacity: 1, scale: 1 },
          }}
          transition={Time}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-white"
          variants={{
            rest: { opacity: 0, x: 40 },
            hover: { opacity: 1, x: 0 },
          }}
          transition={Time}
        >
          {text}
        </motion.p>
      </motion.div>

      {/* trekanter - vises også kun ved hover */}
      <motion.div
        className="absolute top-0 left-0 w-0 h-0 border-r-70 border-r-transparent border-t-70 border-t-(--pink) opacity-0 group-hover:opacity-100 "
        variants={{
          rest: { opacity: 0, y: -40 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={Fast}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-0 h-0 border-l-70 border-l-transparent border-b-70 border-b-(--pink) opacity-0 group-hover:opacity-100 "
        variants={{
          rest: { opacity: 0, y: 40 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={Fast}
      />
    </motion.div>
  );
}
