import React from "react";
import Link from "next/link";
import BlogCard from "../blog/BlogCard"; 
import { Blog } from "@/types/project";

const BlogSection = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, {
    next: { revalidate: 30 }, 
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  const json = await res.json();
  const blogs: Blog[] = json.data || [];
  const displayedBlogs = blogs.slice(0, 6); 

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl">Latest Articles & Tutorials</h1>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        Discover my thoughts, insights, and experiences through my latest blog posts.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {displayedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length > 6 && (
        <div className="text-center mt-10">
          <Link href="/blogs">
            <button className="px-6 py-2 bg-blue-500 text-base">See More Blogs</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
