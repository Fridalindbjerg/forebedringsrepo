"use client";
import { useForm } from "react-hook-form";
import Button from "@/app/button";
import { useState } from "react";

type FormFields = {
  email: string;
};

const EmailSub = () => {
  // starter komponenten

  const [buttonText, setButtonText] = useState("Subscribe");
  //   benyttet ai til hjælp. Hjælp til hvordan jeg bruger useState til at ændre knap tekst efter submit.
  //   opretter et state til knap tekst - sådan så knaptekst ændrer sig efter submit. Udgangs tekst er "Subscribe".

  const {
    register,
    // sørger for at validering sker ved tryk på submit knap
    handleSubmit,
    // håndterer submit og kalder onSubmit hvis validering er bestået
    reset,
    // gør så formen nulstilles efter submit
    formState: { errors },
  } = useForm<FormFields>();

  // funnktionen der kører når ovenstående validering er bestået
  const onSubmit = async (data: FormFields) => {
    // ændrer knap tekst til submitting under fetch kald - sådan at bruger kan se at der sker noget.
    setButtonText("Submitting...");

    const res = await fetch("http://localhost:4000/newsletters", {
      // sender en POST til api'en
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    // klassisk if else til at håndtere respons fra server
    // hvis server returnerer en fejl, ændres knap tekst til error
    if (!res.ok) {
      setButtonText("Error");
      return;
    }

    // button tekst ændres til submitted hvis alt er ok (validering + post request)
    setButtonText("Submitted");

    reset();
    // tømmer felter
  };

  return (
    <section className="grid col-[content-start/content-end] text-center gap-2 mx-5 my-10 md:mx-auto  md:w-full md:max-w-2xl">
      <h3 className="text-xl font-medium uppercase">Want the latest nightclub news</h3>
      <p className="mb-5">
        Subscribe to our newsletter and never miss an <span className="text-(--pink)">Event</span>
      </p>

      <form
        className="grid grid-cols-1 md:grid-cols-[2fr_max-content] 
   gap-y-4 md:gap-y-4 gap-x-4 text-white placeholder-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-white border-b px-2 py-2 w-full"
          type="text"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            validate: (value) => value.includes("@") || "Email must include @",
          })}
        />

        {errors.email && <div className="col-span-1 md:col-span-2 text-left text-white">{errors.email.message}</div>}
        <div className="flex justify-center md:self-end md:row-start-1 md:col-start-2">
          <Button text={buttonText} />
        </div>
      </form>
    </section>
  );
};

export default EmailSub;
