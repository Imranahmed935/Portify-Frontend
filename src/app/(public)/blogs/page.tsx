import BlogCard from "@/components/modules/blog/BlogCard";

interface Blog {
  id?: number;
  title?: string;
  content?: string;
  authorId?: number;
  thumbnail?: string;
}

const BlogPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, {
    next:{revalidate:30}
  });

  if (!res.ok) {
    return (
      <div className="py-30 px-4 max-w-7xl mx-auto text-center text-red-500">
        Failed to load blogs 😢
      </div>
    );
  }

  const data = await res.json(); 
   const blogs = data?.data || data || [];
   
    return (
        <div className="py-30 px-4 max-w-7xl mx-auto space-y-6">
           <h1 className="font-bold text-2xl">Latest Articles & Tutorials</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {blogs.length > 0 ? (
          blogs.map((blog:Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts available.
          </p>
        )}
            </div>
        </div>
    );
};

export default BlogPage;