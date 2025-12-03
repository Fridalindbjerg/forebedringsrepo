import { div } from "framer-motion/client";

const Blog = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/blogposts/${id}?_embed=comments`);
  const singlepost = await response.json();
  const count = singlepost.comments?.length ?? 0;

  return (
    <div className=" col-[content-start/content-end] ">
      <div className="">
        <img src={singlepost.asset.url} alt={singlepost.title} className="object-cover" />
      </div>
      <div className="flex gap-4 flex-col">
        <h2 className="text-xl font-semibold">{singlepost.title}</h2>
        <div className="flex flex-row gap-2 text-(--pink) font-semibold">
          <p>BY: {singlepost.author}</p>
          <span>/</span>
          <p>{count === 1 ? "1 comment" : `${count} comments`}</p> <span>/</span>
          <p>date: NA</p>
        </div>
        <p className="line-clamp-6">{singlepost.content}</p>
        <h2 className="text-3xl font-semibold mt-8">{count === 1 ? "1 comment" : `${count} comments`}</h2>
        <div className="flex flex-col gap-8 mt-8">
          {singlepost.comments?.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-4">
              <div className="flex gap-2 font-semibold">
                <p>{comment.name}</p>
                <span>-</span>
                <p className="text-(--pink)">{comment.date}</p>
              </div>
              <p className="">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
