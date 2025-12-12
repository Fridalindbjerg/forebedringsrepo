import Form from "./components/form";

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
      <Suspense fallback={<p>Loading reservations...</p>}>
        <ReservationsServer />
      </Suspense>
    </main>
  );
}
