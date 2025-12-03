import Link from "next/link";

const Blogposts = async () => {
  "use server";

  const response = await fetch("http://localhost:4000/blogposts?_embed=comments&_limit=3");
  const posts = await response.json();

  return (
    <main className=" my-8 grid subgrid col-[full-start/full-end] ">
      <h1 className="text-3xl font-bold mb-6">De 3 nyeste blogposts</h1>
      <div className="">
        {posts.map((post) => (
          <div key={post.id} className=" grid grid-cols-2 ">
            <div className="">
              <img src={post.asset.url} alt={post.title} className="my-2" />
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex flex-row gap-2 text-(--pink) font-semibold">
                <p>BY: {post.author}</p>
                <span>/</span>
                <p>{post.comments?.length ?? 0} comments</p>
                <span>/</span>
                <p>date: NA</p>
              </div>
              <p className="line-clamp-6">{post.content}</p>

              <div className="flex justify-end">
                <Link href={`/blogposts/${post.id}`} className="pt-4 pb-4 border-t border-white border-b text-sm">
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Blogposts;
