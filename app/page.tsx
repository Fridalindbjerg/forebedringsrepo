import Section3_Gallery from "./components_home/Section3_gallery";
import Section5_latestvideo from "./components_home/Section5_latestvideo";
import EmailSub from "./components_home/Section8_email_sub";
import Section6_testimonials from "./components_home/Section6_testimonials";
import Section4_track from "./components_home/Section4_track";
import Section2_events from "./components_home/Section2_events";
import Section1_welcome from "./components_home/Section1_welcome";
import Section7_recentblog from "./components_home/Section7_recentblog";
import { Suspense } from "react";

// Timer på loading så den er synlig: Udkommenteres for at fjerne delay
// async function LoadContent() {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return <div className="text-center py-20 px-4"></div>;
// }

export default function HomePage() {
  return (
    <main className="frontpage grid grid-cols-subgrid col-[full-start/full-end]">
      <Section1_welcome />
      <Suspense fallback={<div>Loading Events of the month...</div>}>
        <Section2_events />
      </Suspense>
      <Suspense fallback={<div>Loading gallery...</div>}>
        <Section3_Gallery />
      </Suspense>
      <Section4_track />
      <Section5_latestvideo />
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Section6_testimonials />
      </Suspense>
      <Suspense fallback={<div>Loading recent blog...</div>}>
        <Section7_recentblog />
      </Suspense>
      <EmailSub />
    </main>
  );
}
