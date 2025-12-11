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
    formState: { errors },
  } = useForm<FormFields>();

  // her opretter vi vores onSubmit som håndterer det der sker når formen bliver submitted
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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
    const createdReservation = await res.json();
    console.log("Created reservation:", createdReservation);
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
    <>
      {/* tilføjet onPick som kører handlePickedTable */}
      <Tables onPick={handlePickTable} reservedTables={reservations} />

      <h1 className="font-medium leading-none uppercase text-3xl  my-2.5 text-white">Book a table</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2
        auto-rows-auto gap-2 md:gap-4 text-white placeholder-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-white border px-2 py-2  w-full"
          //   Type her hvilket slags input felt det er
          type="text"
          placeholder="Your Name"
          {...register("name", {
            required: "Name is required",
            //   /\p{L}/u.test(value) søger for navn indeholder bogstaver fra alle sprog og er minimum 2 bogstaver
            validate: (value) => /\p{L}{2,}/u.test(value) || "Name must be at least 2 letters",
          })}
        />
        {errors.name && <div className="text-white">{errors.name.message}</div>}

        <input type="text" readOnly value={picked ?? ""} className="border-white border px-2 py-2  w-full" placeholder="Click a table above" />
        {errors.tablenumber && <div className="text-white">{errors.tablenumber.message}</div>}

        <input
          className="border-white border px-2 py-2  w-full"
          type="date"
          placeholder="Select Date"
          {...register("date", {
            // onChange fanger datoen der bliver klikket på, så vi kun får dagen (getUTCDate).

            onChange: (e) => setSelectedDate(new Date(e.target.value).getUTCDate()),
            required: "Date is required",
            // BEMÆRK SKAL ÆNDRES VIGTIG!!!
            validate: (value) => {
              // godkend hvis den kan parses og er i format YYYY-MM-DD
              return !Number.isNaN(Date.parse(value)) || "You must choose a valid date";
            },
          })}
        />
        {errors.date && <div className="text-white">{errors.date.message}</div>}

        {/* ret nedenstående error message */}

        {/* {errors.tablenumber && <div className="text-white">{errors.tablenumber.message}</div>} */}
        
        
        
        <input
          className="border-white border px-2 py-2  w-full"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: (value) => value.includes("@") || "Email must include @",
          })}
        />
        {errors.email && <div className="text-white">{errors.email.message}</div>}

        <input
          className="border-white border px-2 py-2  w-full"
          type="number"
          placeholder="Number of Guests"
          {...register("guests", {
            required: "Number of guests is required",
            //   Her har jeg indsat en minimum og maximum værdi for antal gæster
            min: {
              value: 1,
              message: "Minimum guests is 1",
            },
            max: {
              value: 40,
              message: "Maximum guests is 40",
            },
          })}
        />
        {errors.guests && <div className="text-white">{errors.guests.message}</div>}

        <input
          className="border-white border px-2 py-2  w-full"
          type="number"
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[1-9]\d{7,14}$/,
              message: "Invalid phone number",
            },
          })}
        />
        {errors.phone && <div className="text-white">{errors.phone.message}</div>}

        {/* <input className="border-white border px-2 py-2  md:col-span-2 h-36" type="text" placeholder="Your Comment" {...register("comments", {})} /> */}

        <textarea className="border-white border px-2 py-2  h-36 resize-none md:col-span-2" placeholder="Your Comment" {...register("comments")} />

        {/*  VIGTIGT HUSK TILFØJ SUBMIT SUCCESS BESKED */}
        <div className="md:col-span-2 flex justify-end">
          <Button text="Reserve" type="submit" />
        </div>
      </form>
    </>
  );
}
