"use client";

import Image from "next/image";

// Definerer typen af props der sendes til Table komponenten
interface TableProps {
  number: number;
  image: string;
  onPick: (n: number) => void;
  disabled?: boolean;
}

// Første del er de props vi sender med til Table komponenten. Efter : definerer vi typen af hver prop i typescript. Hvis der findes en disabled så er det en boolean.
function Table({ number, image, onPick, disabled = false }: TableProps) {
  return (
    <button type="button" onClick={() => !disabled && onPick(number)} disabled={disabled} className={["relative w-32 h-32 rounded-xl transition", disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"].join(" ")} aria-label={`Table ${number}`}>
      <Image src={image} alt={`Table ${number}`} fill className="object-contain" sizes="(max-width:640px) 96px, (max-width:1024px) 128px, 160px" loading="eager" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold px-2 py-1 ">{number}</span>
      </span>
    </button>
  );
}

// Tables komponenten modtager onPick funktion og reservedTables array som props
export default function Tables({ onPick, reservedTables }: { onPick: (n: number) => void; reservedTables: Array<{ id: number; table: number; date: string }> }) {
  const tableArr = [
    { number: 1, img: "/assets/table/table_1.png" },
    { number: 2, img: "/assets/table/table_1.png" },
    { number: 3, img: "/assets/table/table_2.png" },
    { number: 4, img: "/assets/table/table_1.png" },
    { number: 5, img: "/assets/table/table_3.png" },
    { number: 6, img: "/assets/table/table_1.png" },
    { number: 7, img: "/assets/table/table_1.png" },
    { number: 8, img: "/assets/table/table_2.png" },
    { number: 9, img: "/assets/table/table_1.png" },
    { number: 10, img: "/assets/table/table_3.png" },
    { number: 11, img: "/assets/table/table_1.png" },
    { number: 12, img: "/assets/table/table_1.png" },
    { number: 13, img: "/assets/table/table_2.png" },
    { number: 14, img: "/assets/table/table_1.png" },
    { number: 15, img: "/assets/table/table_3.png" },
  ];

  // her laver vi et grid med alle borde ved at mappe over tableArr
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 place-items-center">
      {tableArr.map((table, id) => {
        const isReserved = reservedTables.find((res) => {
          return res.table == table.number;
        });
        // tjekker om bordet er reserveret ved at finde et match i reservedTables arrayet
        return <Table key={id} number={table.number} image={table.img} onPick={onPick} disabled={Boolean(isReserved)} />;
      })}
    </div>
  );
}


