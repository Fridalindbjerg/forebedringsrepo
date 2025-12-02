const Blogposts = async () => {
  "use server";

  const response = await fetch("http://localhost:4000/blogposts?embed=comments");
  const posts = await response.json();

  return (
    <main className=" my-8 grid subgrid col-[full-start/full-end] ">
      <h1 className="text-3xl font-bold mb-6">De 3 nyeste blogposts</h1>
      <div className="">
        {posts.map((post) => (
          <div key={post.id} className="mb-4  ">
            <div className="">
              <img src={post.asset.url} alt={post.title} className="my-2" />
            </div>
            <div className="">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.author}</p>
              <p>{post.content}</p>

              <p>{post.comments?.length ?? 0} comments</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Blogposts;
