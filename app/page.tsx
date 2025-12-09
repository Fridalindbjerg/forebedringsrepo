import Hero from "./components_home/Hero";
import Header from "./components_home/Header";
import Section3_Gallery from "./components_home/Section3_gallery";
import Index_h2 from "./components_home/Index_h2";
import Latestvideo from "./components_home/Latestvideo";
import EmailSub from "./components_home/Section8_email_sub";
import Testimonials from "./components_home/Testimonials";

// Timer på loading så den er synlig: Udkommenteres for at fjerne delay
// async function LoadContent() {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return <div className="text-center py-20 px-4"></div>;
// }

export default function HomePage() {
  return (
    <div>
      <Section3_Gallery />
      <Index_h2 text="Latest video" />
      <Latestvideo />
      <Testimonials />
      <EmailSub />
    </div>
  );
}
