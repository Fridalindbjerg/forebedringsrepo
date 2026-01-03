"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/app/button";
// definerer type
interface FormFields {
  name: string;
  email: string;
  content: string;
}

// send knappen
export default function ContactForm() {
  const [buttonText, setButtonText] = useState("Send");
  // FORBEDRING HER
  // bestemmer state for knappen - default eller active (se de forskellige styles i button.tsx)
  const [buttonState, setButtonState] = useState<"default" | "active">("default");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  // onSubmit funktion til at håndtere form når besked sendes
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setButtonText("Sending...");
    setButtonState("active");

    const res = await fetch("http://localhost:4000/contact_messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
        name: data.name,
        email: data.email,
        content: data.content,
      }),
    });
    const createdMessage = await res.json();
    console.log("Created contact message:", createdMessage);

    // klassisk if else til at håndtere respons fra server
    // hvis server returnerer en fejl, ændres knap tekst til error
    if (!res.ok) {
      setButtonText("Error");

      // FORBEDRING HER
      // efter 5 sekunder ændres knap tekst tilbage til send
      setTimeout(() => {
        setButtonText("Send");
        setButtonState("default");
      }, 5000);

      return;
    }

    // Succesbesked
    // button tekst ændres til submitted hvis alt er ok (validering + post request)
    setButtonText("Message Sent");

    // FORBEDRING HER
    // igen - efter 5 sekunder ændres knap tekst tilbage til send
    setTimeout(() => {
      setButtonText("Send");
      setButtonState("default");
    }, 5000);

    // resetter form efter succesfuld submission
    reset();
  };

  return (
    <section className="place-items-center w-full h-full">
      <form className="grid grid-cols-1 gap-2 md:gap-4 text-white placeholder-white w-80 mx-3" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <input
          className="border-white border px-2 py-2"
          type="text"
          placeholder="Your Name"
          {...register("name", {
            required: "Name is required",
            validate: (value) => /\p{L}{2,}/u.test(value) || "Name must be at least 2 letters",
          })}
        />
        {/* Error besked hvis navn ikke lever op til krav */}
        {errors.name && <div className="text-white">{errors.name.message}</div>}
        <input
          className="border-white border px-2 py-2"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: (value) => value.includes("@") || "Email must include @",
          })}
        />
        {/* Erro besked hvis email ikke lever op til krav */}
        {errors.email && <div className="text-white">{errors.email.message}</div>}
        <textarea className="border-white border px-2 py-2  h-60 resize-none" placeholder="Your Comment" {...register("content")} />
        {errors.content?.message && <div className="text-red-300">{errors.content.message}</div>}
        {/*  Knap med succesbesked fra længere oppe */}
        <div className="flex justify-end">
          <Button text={buttonText} state={buttonState} type="submit" />
        </div>
      </form>
    </section>
  );
}
