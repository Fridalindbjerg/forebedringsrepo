import Section6_testimonials_pag from "./Section6_testimonials_pag";
import { Suspense } from "react";

export default async function TestimonialsSection() {
  const response = await fetch("http://localhost:4000/testimonials");
  const testimonials = await response.json();

  return (
    <section className="relative col-[full-start/full-end] items-center justify-center mt-10 gap-4">
      <div className=" absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: `url("/assets/bg/footerbg.jpg")` }} />
      <div className="absolute inset-0 bg-black opacity-90 -z-10"></div>

      <div className="col-[content-start/content-end] grid place-items-center">        <Suspense fallback={<div>Loading testimonials...</div>}>
        <Section6_testimonials_pag testimonials={testimonials} />
      </Suspense>
      </div>
    </section>
  );
}
