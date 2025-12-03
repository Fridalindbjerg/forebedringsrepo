"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Tables from "./components/tables";

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

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <main className="[grid-column:content-start/content-end]">
      <Tables />

      <h1 className="font-medium leading-none uppercase text-3xl  my-2.5">Book a table</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2
      auto-rows-auto gap-2 md:gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
          //   Type her hvilket slags input felt det er
          type="text"
          placeholder="Your Name"
          {...register("name", {
            required: "Name is required",
            //   /\p{L}/u.test(value) søger for navn indeholder bogstaver fra alle sprog og er minimum 2 bogstaver
            validate: (value) => /\p{L}{2,}/u.test(value) || "Name must be at least 2 letters",
          })}
        />
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
          type="number"
          placeholder="Table Number"
          {...register("tablenumber", {
            required: "Table is required",
            validate: (value) => /\p{L}{2,}/u.test(value) || "You must choose a table",
          })}
        />
        {errors.tablenumber && <div className="text-red-500">{errors.tablenumber.message}</div>}
        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
          type="text"
          placeholder="Select Date"
          {...register("date", {
            required: "Date is required",
            validate: (value) => /\p{L}{2,}/u.test(value) || "You must choose a date",
          })}
        />
        {errors.tablenumber && <div className="text-red-500">{errors.tablenumber.message}</div>}
        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: (value) => value.includes("@") || "Email must include @",
          })}
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}

        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
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
        {errors.guests && <div className="text-red-500">{errors.guests.message}</div>}

        <input
          className="border-white border px-2 py-2 placeholder-white w-full"
          type="number"
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            //   denne value gør at telefon nummeret skal være mellem 8 og 15 cifre og kan starte med et +, for at være internationalt
            // \+? betyder at + er valgfrit i starten
            // [1-9] betyder at det første ciffer skal være mellem 1 og 9 (ingen 0 i starten)
            // \d{7,14} betyder at der skal være mellem 7 og 14 cifre efter det første ciffer
            pattern: {
              value: /^\+?[1-9]\d{7,14}$/,
              message: "Invalid phone number",
            },
          })}
        />
        {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}

        {/* <input className="border-white border px-2 py-2 placeholder-white md:col-span-2 h-36" type="text" placeholder="Your Comment" {...register("comments", {})} /> */}

        <textarea className="border-white border px-2 py-2 placeholder-white h-36 resize-none md:col-span-2" placeholder="Your Comment" {...register("comments")} />

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="border border-white bg-black text-white px-6 py-3
               hover:bg-white hover:text-black transition-colors
               w-auto"
          >
            Reserve
          </button>
        </div>
      </form>
    </main>
  );
}
