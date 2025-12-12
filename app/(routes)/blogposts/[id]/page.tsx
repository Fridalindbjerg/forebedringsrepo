import { div } from "framer-motion/client";
import Comments from "./components/comments";
import Banner from "@/app/components_home/Banner"



const Blog = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/blogposts/${id}?embed=comments`, { cache: "no-store" });
  const singlepost = await response.json();
  console.log("singlepost from server:", singlepost);

  const comments = singlepost.comments ?? [];
  const count = comments.length;

  return (
    <main 
    className="grid grid-cols-subgrid col-[full-start/full-end]">
    <Banner text="Blog post"/>

    <section
    className="grid col-[full-start/full-end] md:col-[content-start/content-end]">
     
        <img src={singlepost.asset.url} alt={singlepost.title} className="w-full h-auto object-cover" />
     

      <div className="gap-4">
        <h2 className="text-xl font-semibold">{singlepost.title}</h2>

        <div className="flex flex-row gap-2 text-(--pink) font-semibold">
          <p>BY: {singlepost.author}</p>
          <span>/</span>
          <p>{count === 1 ? "1 comment" : `${count} comments`}</p>
          <span>/</span>
          <p>date: NA</p>
        </div>

        <p className="line-clamp-6">{singlepost.content}</p>

        <h2 className="text-3xl font-semibold ">{count === 1 ? "1 comment" : `${count} comments`}</h2>

   
        <Comments postId={singlepost.id} initialComments={comments} />
      </div>
    </section>
    </main>
  );
};

export default Blog;
