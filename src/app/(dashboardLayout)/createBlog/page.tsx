"use client";

import React, { useState } from "react";
import BlogForm from "@/components/modules/blog/BlogForm";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AllBlogs from "@/components/modules/blog/AllBlogs";

const CreateBlogPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      {!showForm ? (
       <Button
          className="flex items-center gap-2  text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Create Blog
        </Button>
      ) : (
        <div className="w-full max-w-4xl">
          <BlogForm />
          <button
            className="flex items-center gap-2 mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={() => setShowForm(false)}
          >
            <X size={18} />
            Close Form
          </button>
        </div>
      )}
      <div>
        <AllBlogs/>
      </div>
    </div>
  );
};

export default CreateBlogPage;
