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

const ProjectForm = () => {
  // ✅ Initialize the form
  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      authorId: "",
    },
  });

  return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-0 py-12">
  <div className="w-full max-w-3xl bg-zinc-900 p-10 rounded-xl shadow-lg space-y-8">
    <h2 className="text-4xl font-semibold text-left">Create Project</h2>

    <Form {...form}>
      <form className="space-y-6 w-full">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog title"
                  className="w-full border-[#dbdbdb] bg-transparent text-white"
                  {...field}
                />
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
                <Textarea
                  placeholder="Write your blog content here..."
                  className="w-full min-h-[300px] border-[#dbdbdb] bg-transparent text-white"
                  {...field}
                />
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
                <Input
                  placeholder="Enter image URL"
                  className="w-full border-[#dbdbdb] bg-transparent text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Author ID */}
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Author ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter author ID"
                  className="w-full border-[#dbdbdb] bg-transparent text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full mt-4">
          Publish Blog
        </Button>
      </form>
    </Form>
  </div>
</div>


  );
};

export default ProjectForm;
