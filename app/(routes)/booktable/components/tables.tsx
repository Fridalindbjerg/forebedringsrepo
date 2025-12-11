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
      isReserved: false,
    },
    {
      number: 2,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 3,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 4,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 5,
      img: "/assets/table/table_1.png",
      isReserved: true,
    },
    {
      number: 6,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 7,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 8,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 9,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
    {
      number: 10,
      img: "/assets/table/table_2.png",
      isReserved: true,
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-8">BOOK TABLE</h1>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,_minmax(180px,_1fr))]">
        {tableArr.map((table, id) => {
          const isReserved = reservedTables.find((res) => {
            return res.table == table.number;
          });

          return <Table key={id} number={table.number} image={table.img} onPick={onPick} disabled={Boolean(isReserved)} />;
        })}

        {/* <Table number={1} image="/assets/table/table_1.png" onPick={onPick} />
        <Table number={2} image="/assets/table/table_1.png" onPick={onPick} />
        <Table number={3} image="/assets/table/table_1.png" onPick={onPick} />
        <Table number={4} image="/assets/table/table_1.png" onPick={onPick} />
        <Table number={5} image="/assets/table/table_1.png" onPick={onPick} />
        <Table number={6} image="/assets/table/table_2.png" onPick={onPick} />
        <Table number={7} image="/assets/table/table_2.png" onPick={onPick} />
        <Table number={8} image="/assets/table/table_2.png" onPick={onPick} />
        <Table number={9} image="/assets/table/table_2.png" onPick={onPick} />
        <Table number={10} image="/assets/table/table_2.png" onPick={onPick} />
        <Table number={11} image="/assets/table/table_3.png" onPick={onPick} />
        <Table number={12} image="/assets/table/table_3.png" onPick={onPick} />
        <Table number={13} image="/assets/table/table_3.png" onPick={onPick} />
        <Table number={14} image="/assets/table/table_3.png" onPick={onPick} />
        <Table number={15} image="/assets/table/table_3.png" onPick={onPick} /> */}
      </div>
    </div>
  );
}
