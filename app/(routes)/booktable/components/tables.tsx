"use client";
import Image from "next/image";

function Table({ number, image }: { number: number; image: string }) {
  return (
    <div className="relative w-32 h-32">
      <Image src={image} alt={`Table ${number}`} fill className="object-contain " loading="eager" />

      <span className="absolute inset-0 flex justify-center items-center">
        <span className=" text-white font-bold px-2 py-1">{number}</span>
      </span>
    </div>
  );
}

export default function BookTable() {
  return (
    <div className="w-full mx-auto p-4 ">
      <h1 className="text-center text-3xl font-bold mb-8">BOOK TABLE</h1>

      <div className="grid w-full justify-center place-items-center [grid-template-columns:repeat(auto-fit,_minmax(180px,_max-content))] gap-4">
        <Table number={1} image="/assets/table/table_1.png" />
        <Table number={2} image="/assets/table/table_1.png" />
        <Table number={3} image="/assets/table/table_1.png" />
        <Table number={4} image="/assets/table/table_1.png" />
        <Table number={5} image="/assets/table/table_1.png" />
        <Table number={6} image="/assets/table/table_2.png" />
        <Table number={7} image="/assets/table/table_2.png" />
        <Table number={8} image="/assets/table/table_2.png" />
        <Table number={9} image="/assets/table/table_2.png" />
        <Table number={10} image="/assets/table/table_2.png" />
        <Table number={11} image="/assets/table/table_3.png" />
        <Table number={12} image="/assets/table/table_3.png" />
        <Table number={13} image="/assets/table/table_3.png" />
        <Table number={14} image="/assets/table/table_3.png" />
        <Table number={15} image="/assets/table/table_3.png" />
      </div>
    </div>
  );
}