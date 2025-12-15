import { div } from "framer-motion/client";
import Image from "next/image";

interface props {
  text: string;
}

const Banner = ({ text }: props) => {
  return (
    <section className="banner relative uppercase h-50 bg-cover bg-center flex items-center justify-center col-full">
      {/* Baggrundsbilledet */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/assets/bg/footerbg.jpg")` }}></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Indhold */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">{text}</h1>
        <Image src="/assets/bottom_line.png" alt="party pic" width={1920} height={300} className="w-full h-auto" />
      </div>
    </section>
  );
};

export default Banner;
