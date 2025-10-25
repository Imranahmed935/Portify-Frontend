"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface BlogFormProps {
  onClose: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onClose }) => {
  const { data: session, status } = useSession();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to create a blog");
      return;
    }

    const { title, content, thumbnail } = values;
    const token = session?.user?.accessToken;

    try {
      const res = await fetch("http://localhost:5000/api/v1/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail,
          authorId: session?.user?.id,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to create blog");
        return;
      }

      toast.success("✅ Blog created successfully!");
      onClose(); // close form on success
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl bg-zinc-900 p-6 sm:p-10 rounded-xl shadow-lg overflow-y-auto max-h-full">
        {/* ❎ Cross icon for closing the form */}
        <button
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl sm:text-4xl font-semibold text-left mb-6">
          Create Blog
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
                minLength: { value: 10, message: "Title must be at least 10 characters" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              rules={{
                required: "Content is required",
                minLength: { value: 50, message: "Content must be at least 50 characters" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your blog content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              rules={{
                required: "Thumbnail URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                  message: "Enter a valid image URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              Publish Blog
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;
