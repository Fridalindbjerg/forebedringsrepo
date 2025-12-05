"use client";
import { useForm } from "react-hook-form";

// gør så vi kan bruge router.refresh(), så siden opdateres efter man har postet en kommentar
import { useRouter } from "next/navigation";

import Button from "../../../../button";

// typescript type for form data
type commentForm = { name: string; content: string };

// komponenten modtager postID som prop, så kommentaren knyttes til den rigtige blogpost
// benyttet ai som hjælp til hvordan man laver en kommentar form med react-hook-form, da typescript fungerer anderledes end javascript - vi har også set youtube.

export default function Comments({ postId }: { postId: number }) {
  const router = useRouter();
  const {
    register,
    // sørger for at validering sker ved tryk på submit knap
    handleSubmit,
    reset,
    // nulstiller formen efter submit
   
    formState: { errors },
  } = useForm<commentForm>();

  // funnktionen der kører når ovenstående validering er bestået
  const onSubmit = async (data: commentForm) => {
    await fetch("http://localhost:4000/comments", {
      // sender en POST til api'en
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        name: data.name,
        content: data.content,
        date: new Date().toISOString().slice(0, 10),
      }),
    });

    // tømmer felter
    reset();
    // opdaterer siden så den nye kommentar vises
    router.refresh();
  };

  return (
    // onSubmit bruger handleSubmit fra react-hook-form til at håndtere validering før onSubmit kaldes
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10 ">

      {/* register "name" binder felt til formular og nedenunder kan i se valideringsregler */}
      <input
        {...register("name", {
          required: "Name is required",
          validate: (v) => /\p{L}{2,}/u.test(v.trim()) || "Name must be at least 2 letters",
        })}
        placeholder="Your name"
        className="p-3 bg-black/20 border border-white placeholder-white"
      />
      {/* kører fejlbesked hvis input ikke består validering  */}
      {errors.name?.message && <div className="text-white">{errors.name.message}</div>}

      <textarea {...register("content", { required: "Comment is required" })} placeholder="Write a comment..." className="p-3 placeholder-white bg-black/20 border border-white h-32" />
      {errors.content?.message && <div className="text-white">{errors.content.message}</div>}

      <div className="flex justify-end">
      
        <Button text="Submit" />
      </div>
    </form>
  );
}
