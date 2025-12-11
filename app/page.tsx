import Hero from "./components_home/Hero";
import Header from "./components_home/Header";
import Section3_Gallery from "./components_home/Section3_gallery";
import Index_h2 from "./components_home/Index_h2";
import Latestvideo from "./components_home/Latestvideo";
import EmailSub from "./components_home/Section8_email_sub";
import Testimonials from "./components_home/Testimonials";
import Section2_events from "./components_home/Section2_events";

// Timer på loading så den er synlig: Udkommenteres for at fjerne delay
// async function LoadContent() {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return <div className="text-center py-20 px-4"></div>;
// }

export default function HomePage() {
  return (
    <main className="grid grid-cols-subgrid col-[full-start/full-end]">
      <Section2_events />
      <Section3_Gallery />
      <Latestvideo />
      <Testimonials />
      <EmailSub />
    </main>
  );
}
