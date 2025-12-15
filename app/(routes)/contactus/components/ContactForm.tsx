"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/app/button";
// definerer type (KUN i typescript) for form felter
type FormFields = {
  name: string;
  email: string;
  comments: string;
};

export default function ContactForm() {
  const [buttonText, setButtonText] = useState("Send");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setButtonText("Sending...");

    const res = await fetch("http://localhost:4000/contact_messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        comments: data.comments,
      }),
    });
    const createdMessage = await res.json();
    console.log("Created contact message:", createdMessage);

    // klassisk if else til at håndtere respons fra server
    // hvis server returnerer en fejl, ændres knap tekst til error
    if (!res.ok) {
      setButtonText("Error");
      return;
    }

    // button tekst ændres til submitted hvis alt er ok (validering + post request)
    setButtonText("Message Sent");

    reset();
  };

  return (
    <section className="place-items-center w-full h-full">
      <form className="grid grid-cols-1 gap-2 md:gap-4 text-white placeholder-white w-100 " onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-white border px-2 py-2"
          type="text"
          placeholder="Your Name"
          {...register("name", {
            required: "Name is required",
            validate: (value) => /\p{L}{2,}/u.test(value) || "Name must be at least 2 letters",
          })}
        />
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
        {errors.email && <div className="text-white">{errors.email.message}</div>}

        <textarea className="border-white border px-2 py-2  h-60 resize-none" placeholder="Your Comment" {...register("comments")} />
        {errors.comments?.message && <div className="text-red-300">{errors.comments.message}</div>}

        {/*  VIGTIGT HUSK TILFØJ SUBMIT SUCCESS BESKED */}
        <div className="flex justify-end">
          <Button text={buttonText} type="submit" />
        </div>
      </form>
    </section>
  );
}
