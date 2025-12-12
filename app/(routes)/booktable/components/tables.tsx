"use client";
import { table } from "console";
import { isReservedPage } from "next/dist/build/utils";
import Image from "next/image";

// første del er de props vi sender med til Table komponenten. efter : definerer vi typen af hver prop i typescript. hvis der findes en disabled så er det en boolean.
function Table({ number, image, onPick, disabled = false }: { number: number; image: string; onPick: (n: number) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onPick(number)}
      disabled={disabled}
      className={["relative w-32 h-32 rounded-xl transition", disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"].join(" ")}
      aria-label={`Table ${number}`}
    >
      <Image src={image} alt={`Table ${number}`} fill className="object-contain" sizes="(max-width:640px) 96px, (max-width:1024px) 128px, 160px" loading="eager" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold px-2 py-1 ">{number}</span>
      </span>
    </button>
  );
}

export default function Tables({ onPick, reservedTables }: { onPick: (n: number) => void; reservedTables: Array<{ id: number; table: number; date: string }> }) {
  const tableArr = [
    {
      number: 1,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 2,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 3,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 4,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 5,
      img: "/assets/table/table_3.png",
      isReserved: true,
    },
    {
      number: 6,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 7,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 8,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 9,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 10,
      img: "/assets/table/table_3.png",
      isReserved: true,
    },
    {
      number: 11,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 12,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 13,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 14,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 15,
      img: "/assets/table/table_3.png",
      isReserved: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 place-items-center">
      {tableArr.map((table, id) => {
        const isReserved = reservedTables.find((res) => {
          return res.table == table.number;
        });

        return <Table key={id} number={table.number} image={table.img} onPick={onPick} disabled={Boolean(isReserved)} />;
      })}
    </div>
  );
}

{
  /* <div className="grid gap-4 space-between [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))]"> */
}
