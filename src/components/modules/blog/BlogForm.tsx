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

const BlogForm = () => {
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
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-0 py-12">
      <div className="w-full max-w-3xl bg-zinc-900 p-10 rounded-xl shadow-lg space-y-8">
        <h2 className="text-4xl font-semibold text-left">Create Blog</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
                minLength: { value: 50, message: "Title must be at least 50 characters" },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
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
                minLength: { value: 200, message: "Content must be at least 200 characters" },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
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
