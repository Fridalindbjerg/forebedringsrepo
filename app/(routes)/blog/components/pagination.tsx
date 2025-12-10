// import { usePathname, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function Pagination({ totalPages }: { totalPages: number }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };
// }

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const prev = Math.max(1, currentPage - 1);
  const next = Math.min(totalPages, currentPage + 1);

  return (
   <nav className="flex items-center gap-6 text-white text-xl">
  
  {/* vi starter med at lave et array, som har længden af total sideantal -fordi vi gerne vil have en side 1, 2 ,3 osv der passer til totalPages.
  index er startpositionen i arrayet, så vi laver index +1 for at få sidenummer 1, da vi jo ikke skal starte på side 0.
  
  */}
  {Array.from({ length: totalPages }, (value, index) => index + 1).map((page) =>
    page === currentPage ? (
     
      // her bruger vi span til at lave en "knap" der ikke kan klikkes på, fordi vi er på den side i forvejen. 
      // key fortæller react at det er et unikt element. dvs key fortæller hvilken side vi er på.
      // aria-current fortæller skærmlæsere at dette er den aktuelle side.
      // vi laver også en border-bottom for at indikere hvilken side vi er på, som i vores figma design.


      // overordnet skal det forståes sådan at hvis page er den side vi står på, så vis et span med en understregning. 
      // hvis page IKKE er den side vi står på, så vis et klikbart tal der linker til den side.
      // createPageURL laver et link til den side vi ønsker at gå til.

      // der hvor der står ):) er en "tenernary operator" - en kort form for en if-else sætning. der kunne ligeså godt stå if (page === currentPage) { ... } else { ... }.
      <span
        key={page}
        aria-current="page"
        className="pb-[2px] border-b border-white/70"
      >
        {page}
      </span>
    ) : (
      <Link
        key={page}
        href={createPageURL(page)}
        className="opacity-80 hover:opacity-100 transition-opacity"
      >
        {page}
      </Link>
    )
  )}

  {/* mellemrum og 'næste >'  - &gt; betyder > (altså næb til knap)*/}
  {currentPage < totalPages ? (
    <Link
      href={createPageURL(currentPage + 1)}
      className="ml-2 opacity-90 hover:opacity-100 transition-opacity"
    >
      næste &gt;
    </Link>
  ) : (
    <span className="ml-2 opacity-40 select-none">næste &gt;</span>
  )}
</nav>

  );
}
