import { div } from "framer-motion/client";
import Comments from "./components/comments";
import Button from "../../../button";

const Blog = async ({ params }) => {
  const { id } = await params;

  // const response = await fetch(`http://localhost:4000/blogposts/${id}?_embed=comments`, { cache: "no-store" });
  // const singlepost = await response.json();

  const response = await fetch(`http://localhost:4000/blogposts/${id}`);
  const singlepost = await response.json();

  const commentsRes = await fetch(`http://localhost:4000/comments?postId=${Number(id)}`);
  const comments = await commentsRes.json();

  const count = comments.length;

  return (
    <div className="grid grid-cols-subgrid col-[full-start/full-end]">
      <div className="grid col-[full-start/full-end] md:col-[content-start/content-end]">
        <img src={singlepost.asset.url} alt={singlepost.title} className="w-full h-auto object-cover " />
      </div>
      <div className="gap-4 col-[content-start/content-end] mx-5 my-10">
        <h2 className="text-xl font-semibold">{singlepost.title}</h2>
        <div className="flex flex-row gap-2 text-(--pink) font-semibold">
          <p>BY: {singlepost.author}</p>
          <span>/</span>
          <p>{count === 1 ? "1 comment" : `${count} comments`}</p> <span>/</span>
          <p>date: NA</p>
        </div>
        <p className="line-clamp-6">{singlepost.content}</p>
        <h2 className="text-3xl font-semibold mt-8"> {count === 1 ? "1 comment" : `${count} comments`}</h2>

        <div className="flex flex-col gap-8 mt-8">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((c: any) => {
              const body = c.content ?? "";
              return (
                <div key={c.id} className="flex flex-col gap-4">
                  <div className="flex gap-2 font-semibold">
                    <p>{c.name ?? "Anon"}</p>
                    <span>-</span>
                    <p className="text-(--pink)">Posted {c.date ?? ""}</p>
                  </div>
                  <p>{body}</p>
                </div>
              );
            })
          ) : (
            <p>Ingen kommentarer endnu.</p>
          )}
        </div>

        <Comments postId={singlepost.id} />
      </div>
    </div>
  );
};

export default Blog;
