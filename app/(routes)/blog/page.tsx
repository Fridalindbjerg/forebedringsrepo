import Link from "next/link";
import Banner from "@/app/components_home/Banner";
import Pagination from "./components/pagination";
import Image from "next/image";
import { Suspense } from "react";


type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  asset: {
    url: string;
  };
  comments?: { id: number }[];
};

export default function Page({ searchParams }: { searchParams?: { page?: string } }) {
  return (
    <Suspense fallback={<p>Loading Blog...</p>}>
      <Blogposts searchParams={Promise.resolve(searchParams || {})} />
    </Suspense>
  );
}

async function Blogposts({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;

  // læs side fra url, sæt default til side 1
  const currentPage = Math.max(1, Number(sp?.page) || 1);

  // bestemmer antal posts per side
  const postsPerPage = 3;

  // fetch data på almindelig vis, som vi plejer i undervisning
  // vi indsætter ${currentPage} og ${postsPerPage} i url'en for at paginere + sort via id.
  const url = `http://localhost:4000/blogposts?embed=comments&page=${currentPage}&limit=${postsPerPage}&sort=id&order=desc`;
  const response = await fetch(url, { cache: "no-store" });

  const posts: Post[] = await response.json();
  const total = Number(response.headers.get("X-Total-Count") || 0);
  const totalPages = Math.max(1, Math.ceil(total / postsPerPage));

  console.log("TOTAL COUNT HEADER:", response.headers.get("X-Total-Count"));

  return (
    <main className="blog-page col-[full-start/full-end] grid grid-cols-subgrid mb-20">
      <Banner text="Blog" />

      {posts.map((post: Post) => (
        <section
          key={post.id}
          className="col-[full-start/full-end] grid grid-cols-subgrid items-start md:*:row-start-1 md:[&>*:first-child]:col-[full-start/full-end] md:[&>*:first-child]:md:col-[full-start/middle] md:[&>*:last-child]:col-[content-start/content-end] md:[&>*:last-child]:md:col-[middle/content-end] even:md:[&>*:first-child]:col-[middle/full-end] even:md:[&>*:last-child]:col-[content-start/middle]"
        >
          <div className="col-[full-start/full-end]">
            <Image
              // Sørg for fallback, hvis url er undefined
              src={post.asset?.url || ""}
              // altid alt-tekst
              alt={post.title || "Post image"}
              width={1920}
              height={1080}
              className="w-full h-[360px] md:h-[480px] object-cover"
            />
          </div>
          <div className="mx-5 my-8 col-[content-start/content-end] space-y-4">
            <h2 className="text-xl font-medium uppercase">{post.title}</h2>
            <div className="flex gap-2 font-semibold text-(--pink)">
              <p>BY: {post.author}</p>
              <span>/</span>
              <p>{post.comments?.length ?? 0} comments</p>
              <span>/</span>
              <p>{post.date}</p>
            </div>
            <p className="line-clamp-6">{post.content}</p>
            <div className="flex justify-center md:justify-end mx-5">
              <Link href={`/blogposts/${post.id}`} className="px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white border-t border-b border-white bg-transparent transition-colors duration-200 hover:bg-white hover:text-black hover:cursor-pointer active:bg-white active:text-black focus:bg-white focus:text-black">
                READ MORE
              </Link>
            </div>
          </div>
        </section>
      ))}
      <div className="grid col-[full-start/full-end] md:col-[content-start/content-end] justify-items-center mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
