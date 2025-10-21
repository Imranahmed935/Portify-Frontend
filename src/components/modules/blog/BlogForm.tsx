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
    alert("You must be logged in to create a blog");
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
      const error = await res.json();
      alert(error.message || "Failed to create blog");
      return;
    }

    alert("✅ Blog created successfully!");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
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
