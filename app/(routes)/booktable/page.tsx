import Form from "./components/form";

export default async function Page() {
  const reservations = await fetch("http://localhost:4000/reservations").then((res) => res.json());

  // brug use state til at gemme den valgte dato fra form
  // brug det der er gemt i selected state til at fetche den dato fra api'en
  // lave et array af de borde der er booket den dag og mappe

  // fetch api (reservations), filtrer resultatet baseret på valgt dato

  return (
    <main className="[grid-column:content-start/content-end]">
      <Form data={reservations} />
    </main>
  );
}
