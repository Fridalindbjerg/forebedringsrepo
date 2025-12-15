import Hero from "./components_home/Hero";
import Header from "./components_home/Header";
import Section3_Gallery from "./components_home/Section3_gallery";
import Index_h2 from "./components_home/Index_h2";
import Latestvideo from "./components_home/Latestvideo";
import EmailSub from "./components_home/Section8_email_sub";
import Testimonials from "./components_home/Testimonials";
import Section4_track from "./components_home/Section4_track";
import Section2_events from "./components_home/Section2_events";
import Section1_welcome from "./components_home/Section1_welcome"
import Recentblog from "./components_home/Recentblog";
import { Suspense } from "react";

// Timer på loading så den er synlig: Udkommenteres for at fjerne delay
// async function LoadContent() {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return <div className="text-center py-20 px-4"></div>;
// }

export default function HomePage() {
  return (
    <main className="grid grid-cols-subgrid col-[full-start/full-end]">
      <Section1_welcome/>

      <Suspense fallback={<div>Loading Events of the month...</div>}>
        <Section2_events />
      </Suspense>
      <Suspense fallback={<div>Loading gallery...</div>}>
        <Section3_Gallery />
      </Suspense>
      <Section4_track />
      <Latestvideo />
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>
      {/* LÆG RECENT BLOG IND I SUSPENSE !!!!! */}
      <EmailSub />
      <Suspense fallback={<div>Loading recent blog...</div>}>
        <Recentblog />
      </Suspense>
    </main>
  );
}
