"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogCard from "../blog/BlogCard"; 
import { Blog } from "@/types/project";


const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogsCount, setAllBlogsCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/blog");
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const json = await res.json();
        const blogData: Blog[] = json.data || [];
        setAllBlogsCount(blogData.length);
        setBlogs(blogData.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
    <h1 className="text-center font-bold text-3xl">Latest Articles & Tutorials</h1>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        Discover my thoughts, insights, and experiences through my latest blog posts.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {allBlogsCount > 6 && (
        <div className="text-center mt-10">
          <Link href="/blogs">
            <Button className="px-6 py-2 bg-blue-500 text-base">See More Blogs</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
