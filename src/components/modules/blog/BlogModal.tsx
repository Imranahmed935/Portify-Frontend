/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { handleBlogUpdate} from "@/utils/miniFuntion";

const BlogModal = ({ open, setOpen, blog }: any) => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        thumbnail: blog.thumbnail || "",
      });
    }
  }, [blog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleBlogUpdate(blog.id, token!, formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
          <DialogDescription>
            Modify the blog details below and click update.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter blog content"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Thumbnail URL</label>
            <Input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Enter thumbnail URL"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Update Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
