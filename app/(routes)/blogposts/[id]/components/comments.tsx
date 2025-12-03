"use client";

import { useForm } from "react-hook-form";

export default function Comments({ postId }: { postId: number }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        postId,
        date: new Date().toISOString().split("T")[0]
      }),
    });

    reset(); // tøm formular
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10">
      <input
        {...register("name")}
        placeholder="Your name"
        className="p-3 bg-black/20 border border-white/20 rounded"
      />

      <textarea
        {...register("content")}
        placeholder="Write a comment..."
        className="p-3 bg-black/20 border border-white/20 rounded h-32"
      />

      <button className="border border-white py-2 rounded">
        Submit
      </button>
    </form>
  );
}