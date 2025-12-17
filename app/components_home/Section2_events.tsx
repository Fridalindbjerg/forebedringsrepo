import Section2_overlay from "./Section2_overlay";
import Index_h2 from "./Index_h2";

export default async function Section2_events() {
    const response = await fetch("http://localhost:4000/events");
    const events = await response.json();


    return (
        <section className="relative col-[full-start/full-end] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center -z-10"
                style={{ backgroundImage: `url("/assets/bg/slider_bg_overlay.png")` }}
            />
            <div className="absolute inset-0 bg-black/50 -z-10" />

            <div className="col-[content-start/content-end]">
                <Index_h2 text="Events of the month" />
                <Section2_overlay events={events} />
            </div>
        </section>
    );
} 