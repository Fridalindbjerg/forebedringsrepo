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

export default function Form({ data: data }: { data: Array<{ id: number; name: string; tablenumber: number; date: string; email: string; password: string; guests: number; phone: number; comments: string }> }) {
  const [selectedDate, setSelectedDate] = useState<Number | null>(null);

  const reservations = data.filter((res) => new Date(res.date).getUTCDate() == selectedDate);

  console.log(reservations);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const handlePickTable = (n: number) => {
    setValue("tablenumber", n, { shouldValidate: true, shouldDirty: true });
  };

  const picked = watch("tablenumber");

  return (
    <>
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
            onChange: (e) => setSelectedDate(new Date(e.target.value).getUTCDate()),
            required: "Date is required",
            validate: (value) => /\p{L}{2,}/u.test(value) || "You must choose a date",
          })}
        />

        {errors.tablenumber && <div className="text-white">{errors.tablenumber.message}</div>}
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

        <div className="md:col-span-2 flex justify-end">
          <Button text="Reserve" />
        </div>
      </form>
    </>
  );
}
