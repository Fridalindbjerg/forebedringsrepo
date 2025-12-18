"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaTwitter, FaSnapchatGhost } from "react-icons/fa";
import Image from "next/image";

// TypeScript interface
interface Testimonial {
  id: number;
  name: string;
  content: string;
  asset: { url: string };
  facebook?: string;
  twitter?: string;
  snapchat?: string;
}

// Props interface
interface Props {
  testimonials: Testimonial[];
}
// Testimonials carousel med pagination dots
export default function TestimonialsCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <section className="w-full max-w-4xl mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.div key={testimonials[index].id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
          <Image
            src={testimonials[index].asset.url}
            alt={testimonials[index].name}
            width={128}
            height={128}
            className="mx-auto"
          />{" "}
          <h3 className="mt-4 font-bold uppercase">{testimonials[index].name}</h3>
          <p className="text-lg italic">{testimonials[index].content}</p>
          <div className="flex justify-center gap-4 mt-4">
            {testimonials[index].facebook && (
              // Target _blank for at åbne facebook, snapchat og twitter i ny fane
              <Link href={testimonials[index].facebook} target="_blank" className="border-white border-2 p-2">
                <FaFacebookF />
              </Link>
            )}
            {testimonials[index].twitter && (
              <Link href={testimonials[index].twitter} target="_blank" className="border-white border-2 p-2">
                <FaTwitter />
              </Link>
            )}
            {/* Snapchat eksisterer ikke i api - derfor ses den ikke i browser */}
            {testimonials[index].snapchat && (
              <Link href={testimonials[index].snapchat} target="_blank" className="border-white border-2 p-2">
                <FaSnapchatGhost />
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((testimonial, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3  ${i === index ? "bg-(--pink)" : "bg-white"}`} />
        ))}
      </div>
    </section>
  );
}
