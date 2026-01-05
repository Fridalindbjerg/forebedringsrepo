"use client";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect, useEffectEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";



// Det gamle useEffect uden forbedring, hvor der er tomt dependency array:

//   useEffect(() => {
//     const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
//     setBg(random);
//   }, []);




// FORBEDRING - CUSTOM HOOK TIL AT VÆLGE BAGGRUNDSBILLEDE RANDOM, MED KORREKT BRUG AF useEffectEvent:
// function useRandomBackground() {
//   const [backgroundImage, setBackgroundImage] = useState("");

//   const pickRandomBackground = useEffectEvent(() => {
//     const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
//     setBackgroundImage(random);
//   });

//   // Kør én gang efter mount
//   useEffect(() => {
//     pickRandomBackground();
//   }, []); // tom array er nu OK, fordi pickRandomBackground altid “har” den nyeste state

//   return backgroundImage;
// }


export default function HomePage() {
  // Hook til Client Components, der giver adgang til den aktuelle URL's stinavn
  const pathname = usePathname();
  
  // Kun vis Hero på forsiden
  if (pathname !== "/") return null;

  


  const backgrounds = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];
  const [backgroundImage, setBackgroundImage] = useState("");
    
//FORBEDRING - VÆLG BAGGRUNDSBILLEDE RANDOM VED LOAD AF SIDE:
// useEffect kører efter hver render - vi vil kun køre den én gang ved mount, så hvor vi før brugte et tomt dependency array, så bruger vi nu vores backgrounds array som dependency. Fordi vores array er statisk, kan vi derfor blot bruge backgrounds. 
  useEffect(() => {
    console.log("Effect kører. backgrounds =", backgrounds);

    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(randomBg);
  }, [backgrounds]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen" style={{ backgroundColor: "var(--background)" }}>
          <Image src="/assets/loader/madbars.gif" alt="Loading..." width={100} height={100} className="w-auto h-auto" priority />
        </div>
      }
    >
      <section className="col-[full-start/full-end] h-170 bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex flex-col items-center">
          <div className="text-center max-w-xl">
            {/* Brugt Ai med promt: Det giver fejl, er det fordi der ikke findes en komplet fold in animation? Skal jeg benytte scaleY rotateX osv?  
            Herfra: -- */}
            <motion.img className="m-0 p-0" src="/assets/icon/Logo.svg" alt="Logo" initial={{ scaleY: 0.8, rotateX: -100, opacity: 0 }} animate={{ scaleY: 1, rotateX: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ transformOrigin: "top" }} />

            {/* -- hertil */}

            {/* framer motions */}
            <motion.p className="w-full  text-justify text-3xl px-14 text-white" initial={{ y: -10, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}>
              HAVE A GOOD TIME
              <span className="inline-block w-full"></span>
            </motion.p>
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}>
              <Image src="/assets/bottom_line.png" alt="Bottom Line" width={500} height={50} className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
        {/* </div> */}
      </section>
    </Suspense>
  );
}
