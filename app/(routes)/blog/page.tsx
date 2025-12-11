import Section3_Gallery from "@/app/components_home/Section3_gallery";
import Link from "next/link";
import Button from "../../button";
import EmailSub from "@/app/components_home/Section8_email_sub";
import Banner from "@/app/components_home/Banner";
import Pagination from "./components/pagination";

// export default async function Blogposts({ searchParams }: { searchParams?: { page?: string } }) {
// læs side fra url, sæt default til side 1
// const currentPage = Math.max(1, Number(searchParams?.page) || 1);

// // bestemmer antal posts per side
// const postsPerPage = 3;

// fetch data på almindelig vis, som vi plejer i undervisning
// vi indsætter ${currentPage} og ${postsPerPage} i url'en for at paginere.
// const response = await fetch(`http://localhost:4000/blogposts?embed=comments&page=${currentPage}&limit=${postsPerPage}&sort=id&order=desc`, { cache: "no-store" });
// const posts = await response.json();

export default async function Blogposts({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // <-- note Promise here
}) {
  const sp = await searchParams; // <-- unwrap
  const currentPage = Math.max(1, Number(sp?.page) || 1);

  const postsPerPage = 3;
  const url = `http://localhost:4000/blogposts?embed=comments&page=${currentPage}&limit=${postsPerPage}&sort=id&order=desc`;
  const response = await fetch(url, { cache: "no-store" });

  const posts = await response.json();
  const total = Number(response.headers.get("X-Total-Count") || 0);
  const totalPages = Math.max(1, Math.ceil(total / postsPerPage));

  console.log("TOTAL COUNT HEADER:", response.headers.get("X-Total-Count"));

  return (
    <main className="col-[full-start/full-end] grid grid-cols-subgrid my-8">
      <Banner text="Blog" />
      <h1 className="col-[content-start/content-end] text-3xl font-bold my-5">De 3 nyeste blogposts</h1>

      {posts.map((post) => (
        <article
          key={post.id}
          className="col-[full-start/full-end]
            grid grid-cols-subgrid items-start

            
            
            *:mx-0
            md:*:row-start-1 


            
             md:[&>*:first-child]:col-[full-start/full-end]
            md:[&>*:first-child]:md:col-[full-start/middle]
            md:[&>*:last-child]:col-[content-start/content-end]
            md:[&>*:last-child]:md:col-[middle/content-end]

             even:md:[&>*:first-child]:col-[middle/full-end]
            even:md:[&>*:last-child]:col-[content-start/middle]
"
        >
          {/* Billede (1st child) */}
          <div className="col-[full-start/full-end]">
            <img src={post.asset?.url} alt={post.title} className="w-full h-[360px] md:h-[480px] object-cover" />
          </div>

          {/* Tekst (last child) */}
          <div
            className="   mx-5 my-10  
    col-[content-start/content-end] 
    space-y-4

    

"
          >
            <h2 className="text-xl font-medium uppercase">{post.title}</h2>

            <div className="flex gap-2 font-semibold text-(--pink)">
              <p>BY: {post.author}</p>
              <span>/</span>
              <p>{post.comments?.length ?? 0} comments</p>
              <span>/</span>
              <p>{post.date}</p>
            </div>

            <p className="line-clamp-6">{post.content}</p>

            <div>
              <Link href={`/blogposts/${post.id}`} className="px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white border-t border-b border-white bg-transparent transition-colors duration-200 hover:bg-white hover:text-black">
                READ MORE
              </Link>
            </div>
          </div>
        </article>
      ))}
      <div className="grid col-[full-start/full-end] md:col-[content-start/content-end] justify-items-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}

// export default Blogposts;

// const isEven = (n: number) => n % 2 === 0;

// const Blogposts = async () => {
//   "use server";

//   const response = await fetch("http://localhost:4000/blogposts?_embed=comments&_limit=3");
//   const posts = await response.json();

//   return (
//     <main
//       className="
//     col-[full-start/full-end]
//     grid grid-cols-subgrid
//     my-8
//     "
//     >
//       <Banner />
//       <EmailSub />
//       <h1 className="col-[content-start/content-end] text-3xl font-bold mx-5 my-5 ">De 3 nyeste blogposts</h1>

//       {posts.map((post, i) => {
//         const flip = !isEven(i);

//         return (
//           // article er subgrid af main/body grid
//           <article
//             key={post.id}
//             className="
//               col-[full-start/full-end]
//               grid grid-cols-subgrid

//               items-start
//             "
//           >
//             {/* BILLEDE */}
//             <div
//               className={`
//               col-[full-start/full-end]
//               md:row-start-1
//               ${flip ? "md:col-[full-start/middle]" : "md:col-[middle/full-end]"}
//             `}
//             >
//               <img
//                 src={post.asset?.url}
//                 alt={post.title}
//                 className="
//                 w-full h-[360px] md:h-[480px]
//                 object-cover
//               "
//               />
//             </div>

//             {/* TEKST */}
//             <div
//               className={`  mx-5 my-10  col-[content-start/content-end]
//               md:row-start-1
//               ${flip ? "md:col-[middle/content-end] " : "md:col-[content-start/middle] "}
//               space-y-4
//             `}
//             >
//               <h2 className="text-xl font-medium uppercase">{post.title}</h2>

//               <div
//                 className={`
//                 flex gap-2 font-semibold text-(--pink)

//               `}
//               >
//                 <p>BY: {post.author}</p>
//                 <span>/</span>
//                 <p>{post.comments?.length ?? 0} comments</p>
//                 <span>/</span>
//                 <p>date: NA</p>
//               </div>

//               <p className="line-clamp-6">{post.content}</p>

//               <div>
//                 <Link
//                   href={`/blogposts/${post.id}`}
//                   className="px-6 py-3
//         text-xs font-semibold tracking-widest uppercase
//         text-white
//         border-t border-b border-white
//         bg-transparent
//         transition-colors duration-200
//         hover:bg-white hover:text-black"
//                 >
//                   READ MORE
//                 </Link>
//               </div>
//             </div>
//           </article>
//         );
//       })}
//     </main>
//   );
// };

// export default Blogposts;
