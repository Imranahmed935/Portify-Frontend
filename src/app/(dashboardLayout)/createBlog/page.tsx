"use client";

import React, { useState } from "react";
import BlogForm from "@/components/modules/blog/BlogForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AllBlogs from "@/components/modules/blog/AllBlogs";

const CreateBlogPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className=" bg-zinc-950 text-white px-4 py-12">
      {!showForm && (
        <Button
          className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Create Blog
        </Button>
      )}

      {showForm && <BlogForm onClose={() => setShowForm(false)} />}

      <div className="mt-10">
        <AllBlogs />
      </div>
    </div>
  );
};

export default CreateBlogPage;
