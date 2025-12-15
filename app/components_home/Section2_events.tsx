import Section2_overlay from "./Section2_overlay";

export default async function Section2_events() {
    const response = await fetch("http://localhost:4000/events");
    const events = await response.json();


    return (
        <section className="col-[content-start/content-end]">
            <div className="">
                    <Section2_overlay events={events} />
            </div>
        </section>
    );
}