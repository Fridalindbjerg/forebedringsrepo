import Section3_popup, { Picture } from "./Section3_popup";
import Index_h2 from "./Index_h2";

const Section3_Gallery = async () => {
  // Server-side fetch
  const response = await fetch("http://localhost:4000/gallery?_limit=7");
  const gallery: Picture[] = await response.json();

  // Timer på loading så den er synlig: Udkommenteres for at fjerne delay
  // async function LoadContent() {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   return <div className="text-center py-20 px-4"></div>;
  // }

  return (
    <section className="col-[full-start/full-end]">
      <Index_h2 text="Night club gallery" />
      <Section3_popup gallery={gallery} />
    </section>
  );
};

export default Section3_Gallery;