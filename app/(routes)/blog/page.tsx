import Section3_Gallery from "@/app/components_home/Section3_gallery";
import Link from "next/link";
import Button from "../../button";
import EmailSub from "@/app/components_home/Section8_email_sub";
import Banner from "@/app/components_home/Banner";

// type BlogPost = {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
// };

const isEven = (n: number) => n % 2 === 0;

const Blogposts = async () => {
  "use server";

  const response = await fetch("http://localhost:4000/blogposts?_embed=comments&_limit=3");
  const posts = await response.json();

  return (
    <main
      className="
    col-[full-start/full-end]
    grid grid-cols-subgrid 
    my-8 
    "
    >
      <Banner />
      <EmailSub />
      <h1 className="col-[content-start/content-end] text-3xl font-bold mx-5 my-5 ">De 3 nyeste blogposts</h1>

      {posts.map((post, i) => {
        const flip = !isEven(i);

        return (
          // article er subgrid af main/body grid
          <article
            key={post.id}
            className="
              col-[full-start/full-end]
              grid grid-cols-subgrid 
              
              items-start 
            "
          >
            {/* BILLEDE */}
            <div
              className={`
              col-[full-start/full-end]
              md:row-start-1
              ${flip ? "md:col-[full-start/middle]" : "md:col-[middle/full-end]"}
            `}
            >
              <img
                src={post.asset?.url}
                alt={post.title}
                className="
                w-full h-[360px] md:h-[480px]
                object-cover 
              "
              />
            </div>

            {/* TEKST */}
            <div
              className={`  mx-5 my-10  col-[content-start/content-end] 
              md:row-start-1 
              ${flip ? "md:col-[middle/content-end] " : "md:col-[content-start/middle] "}
              space-y-4
            `}
            >
              <h2 className="text-xl font-medium uppercase">{post.title}</h2>

              <div
                className={`
                flex gap-2 font-semibold text-(--pink)
                
              `}
              >
                <p>BY: {post.author}</p>
                <span>/</span>
                <p>{post.comments?.length ?? 0} comments</p>
                <span>/</span>
                <p>date: NA</p>
              </div>

              <p className="line-clamp-6">{post.content}</p>

              <div>
                <Link
                  href={`/blogposts/${post.id}`}
                  className="px-6 py-3
        text-xs font-semibold tracking-widest uppercase
        text-white
        border-t border-b border-white
        bg-transparent
        transition-colors duration-200
        hover:bg-white hover:text-black"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default Blogposts;
