import Card from "./Section1_welcome_card";
import Index_h2 from "./Index_h2"


export default function Section1_welcome() {
  return (
    <section className="col-[full-start/full-end]">

      <div className="col-[content-start/content-end]">
        <Index_h2 text="Welcome to nightclub" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

          <Card image="/assets/content-img/thumb1.jpg" title="Night Club" text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable." icon="/assets/icon/favicon.png" />

          <Card image="/assets/content-img/reastaurant_1.jpg" title="Restaurant" text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution." icon="/assets/icon/favicon.png" />

          <Card image="/assets/content-img/thumb2.jpg" title="Bar" text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin." icon="/assets/icon/favicon.png" />
        </div>
      </div>
    </section>
  );
}
