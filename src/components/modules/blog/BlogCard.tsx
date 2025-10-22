"use client";

import Link from "next/link";
import React from "react";

interface Blog {
  id?: number;
  title?: string;
  content?: string;
  authorId?: number;
  thumbnail?: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  const {
    id,
    title = "Untitled Blog",
    content = "No content available.",
    thumbnail,
  } = blog;

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-[#18181b] text-white">

      <div className="h-48 w-full overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

 
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm line-clamp-3">{content}</p>
      </div>


      <div className="px-4 pb-4 text-sm font-medium flex justify-end">
        {id && (
          <Link
            href={`/blogs/${id}`}
            className="text-blue-500 hover:underline"
          >
            Read more →
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
