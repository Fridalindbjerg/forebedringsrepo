import Testimonials_pag from "./Testimonials_pag";



export default async function TestimonialsSection() {
  const response = await fetch("http://localhost:4000/testimonials");
  const testimonials = await response.json();

  return (
    <main className="col-full">
      <Testimonials_pag testimonials={testimonials} />
    </main>
  );
}
