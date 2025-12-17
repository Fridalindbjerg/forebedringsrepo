import Form from "./components/form";
import Banner from "@/app/components_home/Banner";

// Server component (async)
async function ReservationsServer() {
  const res = await fetch("http://localhost:4000/reservations", { cache: "no-store" });
  const reservations = await res.json();

  return <Form data={reservations} />;
}

// Page component (ikke async)
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="col-[content-start/content-end]">
      <Banner text="Book table" />
      <Suspense fallback={<p>Loading reservations...</p>}>
        <ReservationsServer />
      </Suspense>
    </main>
  );
}
