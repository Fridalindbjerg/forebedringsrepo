"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../../../button";

// TypeScript type for form data
type commentForm = {
  name: string;
  content: string;
};

// TypeScript type for en kommentar
type Comment = {
  id: number; // Unikt ID genereret af serveren
  blogpostId: number; // ID på blogposten, som kommentaren hører til
  name: string; // Navn på personen, der kommenterer
  content: string; // Selve kommentaren
  date: string; // Dato for kommentaren
};

interface CommentsProps {
  postId: number; // ID på den blogpost, kommentaren hører til
  initialComments?: Comment[]; // Optional: eksisterende kommentarer ved load
}

export default function Comments({ postId, initialComments = [] }: CommentsProps) {
  // State til at holde styr på kommentarer i UI
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Opsætning af react-hook-form
  const {
    register, // Binder inputfelter til formularen
    handleSubmit, // Håndterer validering og submit
    reset, // Nulstiller formularen efter submit
    formState: { errors }, // Holder styr på valideringsfejl
  } = useForm<commentForm>();

  // Funktion der kører, når formen submittes
  const onSubmit = async (data: commentForm) => {
    // Send POST til serveren for at oprette en ny kommentar
    const res = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogpostId: postId, // Hvilken blogpost kommentaren hører til
        name: data.name, // Navn fra inputfeltet
        content: data.content, // Kommentar indhold
        date: new Date().toISOString().slice(0, 10), // Formateret dato
      }),
    });

    // Vent på serverens svar – kommentaren kommer nu med ID genereret af serveren
    const createdComment = await res.json();

    // Opdater UI med den nye kommentar i bunden
    setComments((prev) => [...prev, createdComment]);

    // Nulstil inputfelterne
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10">
      {/* Liste over kommentarer */}
      <div className="mt-6 flex flex-col gap-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2">
            <strong>{comment.name}</strong> {/* Navn på kommentator */}
            <span className="text-(--pink)">{comment.date}</span> {/* Dato */}
            <p>{comment.content}</p> {/* Kommentar indhold */}
          </div>
        ))}
      </div>

      {/* Input til navn */}
      <input {...register("name", { required: "Name is required" })} placeholder="Your name" className="p-3 bg-black/20 border border-white placeholder-white" />
      {/* Valideringsfejl for navn */}
      {errors.name?.message && <div className="text-white">{errors.name.message}</div>}

      {/* Input til kommentar */}
      <textarea {...register("content", { required: "Comment is required" })} placeholder="Write a comment..." className="p-3 placeholder-white bg-black/20 border border-white h-32" />
      {/* Valideringsfejl for kommentar */}
      {errors.content?.message && <div className="text-white">{errors.content.message}</div>}

      {/* Submit-knap */}
      <div className="flex justify-end">
        <Button text="Submit" />
      </div>
    </form>
  );
}
