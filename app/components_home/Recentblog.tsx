import Link from "next/link";
import Index_h2 from "./Index_h2";
import Image from "next/image";

// Definerer typen for en blogpost, ellers antager den at post er af typen any.
type BlogPost = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  comments: { id: number }[];
  asset?: { url: string };
};

export default async function Recentblog() {
  const limit = 3;
  const url = `http://localhost:4000/blogposts?embed=comments&limit=${limit}&sort=id&order=desc`;
  const response = await fetch(url, { cache: "no-store" });
  const posts: BlogPost[] = await response.json();

  return (
    <section className="col-[content-start/content-end] flex justify-between gap-5">
      {posts.map((post) => (
        <Link key={post.id} href={`/blogposts/${post.id}`}>
          <article className="space-y-5">
            <div className="">
              <Image
                // "!"" i src for at sige at det aldrig er undefined i typescripten
                src={post.asset!.url}
                alt={post.title}
                width={900}
                height={900}
                className=""
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-medium uppercase">{post.title}</h2>
              <div className="flex gap-2 font-semibold text-(--pink)">
                <p>BY: {post.author}</p>
                <span>/</span>
                <p>{post.comments?.length ?? 0} comments</p>
                <span>/</span>
                <p>{post.date}</p>
              </div>
              <p className="line-clamp-3 text-white">{post.content}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}
