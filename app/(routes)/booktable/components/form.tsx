"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Tables from "./tables";
import Button from "@/app/button";

// definer type (KUN i typescript) for form felter
type FormFields = {
  name: string;
  tablenumber: number;
  date: string;
  email: string;
  password: string;
  guests: number;
  phone: number;
  comments: string;
};

// test om vi kan bruge formfields efter data:
export default function Form({ data: data }: { data: Array<{ id: number; name: string; tablenumber: number; date: string; email: string; password: string; guests: number; phone: number; comments: string }> }) {
  // brug useState til...
  const [selectedDate, setSelectedDate] = useState<Number | null>(null);

  // i const reservations filtrerer vi data for én eneklt reservation hvor vi finder datoen (uagtet af tidszone - getUTCDate) der matcher den valgte dato fra form
  const reservations = data.filter((res) => new Date(res.date).getUTCDate() == selectedDate);

  console.log(reservations);

  // her skriver vi de ting ind som vi skal bruge i forms hook, for at håndtere validering og indsendelse af form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const [buttonText, setButtonText] = useState("Reserve");

  // her opretter vi vores onSubmit som håndterer det der sker når formen bliver submitted
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setButtonText("Booking...");

    // Send POST til serveren for at oprette en ny reservation
    const res = await fetch("http://localhost:4000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        table: String(data.tablenumber),
        guests: String(data.guests),
        // <input type="date"> giver "YYYY-MM-DD" — vi sætter et standard tidspunkt (20:00:00Z) som i dit eksempel
        date: new Date(data.date + "T20:00:00.000Z").toISOString(),
        phone: String(data.phone),
        comments: data.comments,
      }),
    });
    // Vent på serverens svar – reservationen kommer nu tilbage med ID genereret af serveren

    // OBS TIL MIG SELV PÅ NEDENSTÅENDE
    // const createdReservation = await res.json();
    // console.log("Created reservation:", createdReservation);

    if (!res.ok) {
      setButtonText("Error");
      return;
    }

    setButtonText("Your table is now reserved!");

    reset();
  };

  // her laver vi en funktion for handlePickTable, n = det tal (bordnummer), der sendes ind, skal være number.
  //
  const handlePickTable = (n: number) => {
    // setValue kommer fra hooksfrom, der ændrer værdien af et bestemt felt i formularen
    // shouldValidate: Efter værdien ændres, skal react-hook-form køre validering på feltet.
    // shouldDirty: dirty= bruger har ændret feltets oprindelige værdi = at forhindre formularen i at blive sendt, hvis intet er ændret.

    // kort sagt -> sæt tablenumber ti n -> marker felt som ændret af bruger -> kør validering på feltet
    setValue("tablenumber", n, { shouldValidate: true, shouldDirty: true });
  };

  const picked = watch("tablenumber");

  return (
    <section className="cols-[content-start/content-end]">
      {/* tilføjet onPick som kører handlePickedTable */}
      <Tables onPick={handlePickTable} reservedTables={reservations} />

      <h1 className="font-medium leading-none uppercase text-3xl  my-2.5 text-white">Book a table</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white placeholder-white" onSubmit={handleSubmit(onSubmit)}>
        {/* Navn */}
        <div className="flex flex-col gap-1">
          {errors.name ? <span className="text-red-500 text-sm">{errors.name.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full"
            type="text"
            placeholder="Your Name"
            {...register("name", {
              required: "Name is required",
              validate: (value) => /\p{L}{2,}/u.test(value) || "Name must be at least 2 letters",
            })}
          />
        </div>

        {/* Table number */}
        <div className="flex flex-col gap-1">
          {errors.tablenumber ? <span className="text-red-500 text-sm">{errors.tablenumber.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full"
            type="text"
            readOnly
            placeholder="Click a table above"
            value={picked ?? ""}
            {...register("tablenumber", {
              required: "Please pick a table",
            })}
          />
        </div>

        {/* Dato */}
        <div className="flex flex-col gap-1">
          {errors.date ? <span className="text-red-500 text-sm">{errors.date.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            type="date"
            {...register("date", {
              onChange: (e) => setSelectedDate(new Date(e.target.value).getUTCDate()),
              required: "Date is required",
              validate: (value) => !Number.isNaN(Date.parse(value)) || "You must choose a valid date",
            })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          {errors.email ? <span className="text-red-500 text-sm">{errors.email.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => value.includes("@") || "Email must include @",
            })}
          />
        </div>

        {/* Antal gæster */}
        <div className="flex flex-col gap-1">
          {errors.guests ? <span className="text-red-500 text-sm">{errors.guests.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full"
            type="number"
            placeholder="Number of Guests"
            {...register("guests", {
              required: "Number of guests is required",
              min: { value: 1, message: "Minimum guests is 1" },
              max: { value: 40, message: "Maximum guests is 40" },
            })}
          />
        </div>

        {/* Tlf nr */}
        <div className="flex flex-col gap-1">
          {errors.phone ? <span className="text-red-500 text-sm">{errors.phone.message}</span> : <span className="h-4"></span>}

          <input
            className="border-white border px-2 py-2 w-full"
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^\+?[1-9]\d{7,14}$/, message: "Invalid phone number" },
            })}
          />
        </div>

        {/* Kommentar */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <span className="h-4"></span>
          <textarea className="border-white border px-2 py-2 h-36 resize-none w-full" placeholder="Your Comment" {...register("comments")} />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <Button text={buttonText} type="submit" />
        </div>
      </form>
    </section>
  );
}
