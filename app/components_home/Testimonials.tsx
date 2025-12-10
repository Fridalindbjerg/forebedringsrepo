import Testimonials_pag from "./Testimonials_pag";



export default async function TestimonialsSection() {
  const response = await fetch("http://localhost:4000/testimonials");
  const testimonials = await response.json();

  return (
    <section className="col-[content-start/content-end] items-center justify-center mt-10 gap-4">
      <Testimonials_pag testimonials={testimonials} />
    </section>
  );
}
