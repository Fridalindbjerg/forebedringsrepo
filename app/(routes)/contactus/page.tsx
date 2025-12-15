import Banner from "@/app/components_home/Banner";
import ContactForm from "./components/ContactForm";

export default async function Page() {
    const contactus = await fetch("http://localhost:4000/contact_messages").then((res) => res.json());

    return (
        <main className="[grid-column:content-start/content-end] ">
            <Banner text="Contact Us" />
            <ContactForm />
        </main>
    );
}

