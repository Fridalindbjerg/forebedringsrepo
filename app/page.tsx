import Hero from "./components_home/Hero";
import Header from "./components_home/Header";
import Section3_Gallery from "./components_home/Section3_gallery";
import Index_h2 from "./components_home/Index_h2";
import { div } from "framer-motion/client";

export default function HomePage() {

  return (
    <div>
      <Hero />
      <Header />
      <Index_h2 text="night club gallery" />
      <Section3_Gallery />
    </div>
  );
}
