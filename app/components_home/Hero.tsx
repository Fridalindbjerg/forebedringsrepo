"use client";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Timer på loading så den er synlig: Udkommenteres for at fjerne delay
// async function LoadContent() {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return <div className="text-center py-20 px-4"></div>;
// }

export default function HomePage() {
  const pathname = usePathname();

  // Kun vis Hero på forsiden
  if (pathname !== "/") return null;

  // Brugt ai med denne prompt: "Hvis jeg skal importere billederne som en konstant frem for med imort i react, kan jeg så lave det som en const og så bruge math til at vise billederne random?" Herefter promt: "Fejl i server/client connection, hvordan løses det?" -- herfra:

  const backgrounds = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];
  // Laver en state til baggrundsbilledet ved hjælp af useState og useEffect:
  const [backgroundImage, setBackgroundImage] = useState("");

  // Vælger et tilfældigt baggrundsbillede med useEffect:
  useEffect(() => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(randomBg);
  }, []);
  // -- hertil

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen" style={{ backgroundColor: "var(--foreground)" }}>
          <img src="/assets/loader/madbars.gif" alt="Loading..." />
        </div>
      }
    >
      <section className="col-[full-start/full-end] h-170 bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Content to be loaded: Udkommenteres for at fjerne delay*/}
        {/* <LoadContent /> */}

        <div className="flex flex-col items-center">
          <div className="text-center max-w-xl">
            <div className="inline-block">
              {/* Brugt Ai med promt: Det giver fejl, er det fordi der ikke findes en komplet fold in animation? Skal jeg benytte scaleY rotateX osv?  Herfra: -- */}
              <motion.img className="m-0 p-0" src="/assets/icon/Logo.svg" alt="Logo" initial={{ scaleY: 0.8, rotateX: -100, opacity: 0 }} animate={{ scaleY: 1, rotateX: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ transformOrigin: "top" }} />

              {/* -- hertil */}

              <motion.p className="w-full  text-justify text-3xl px-14 text-white" initial={{ y: -10, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}>
                HAVE A GOOD TIME
                <span className="inline-block w-full"></span>
              </motion.p>
              <motion.img
                src="/assets/bottom_line.png"
                alt="Bottom Line"
                className="w-full m-0 p-0" // w-full sikrer samme bredde som wrapperen
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 20, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
