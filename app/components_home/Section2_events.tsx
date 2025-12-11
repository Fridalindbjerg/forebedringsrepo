import Section2_overlay from "./Section2_overlay";
import { Suspense } from "react";

export default async function Section2_events() {
    const response = await fetch("http://localhost:4000/events");
    const events = await response.json();


    return (
        <section className="col-[content-start/content-end]">
            <div className="">
                <Suspense fallback={"Loading..."}>
                    <Section2_overlay events={events} />
                </Suspense>
            </div>
        </section>
    );
}