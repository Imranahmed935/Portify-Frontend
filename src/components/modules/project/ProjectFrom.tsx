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

interface ProjectFormProps {
  onClose?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose }) => {
  const { data: session, status } = useSession();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      githubLink: "",
      liveLink: "",
      tags: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to create a project");
      return;
    }

    const { title, content, thumbnail, githubLink, liveLink } = values;
    const token = session?.user?.accessToken;

    const projectInfo = {
      tags: values.tags
        ? values.tags
            .toString()
            .split(",")
            .map((tag: string) => tag.trim())
        : [],
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail,
          githubLink,
          liveLink,
          tags: projectInfo.tags,
          authorId: session?.user?.id,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to create project");
        return;
      }

      await res.json();
      toast.success("Project created successfully!");

      // Close the form after successful submission
      if (onClose) onClose();
      form.reset();
    } catch (error) {
      console.error("❌ Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4 py-12 sm:px-6 md:px-8 lg:px-10 relative">
      <div className="w-full  lg:max-w-3xl bg-zinc-900 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg space-y-8 relative">
        {/* Top-right cross button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 hover:scale-110 transition-transform duration-200"
          aria-label="Close form"
        >
          <X size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
        </button>

        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-left">
          Create Project
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 md:space-y-6 w-full"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project title"
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
              rules={{
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your project content here..."
                      className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] border-[#dbdbdb] bg-transparent text-white"
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
              rules={{
                required: "Thumbnail URL is required",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: "Enter a valid image URL",
                },
              }}
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

            {/* GitHub Link */}
            <FormField
              control={form.control}
              name="githubLink"
              rules={{
                required: "GitHub link is required",
                pattern: {
                  value: /^https?:\/\/(www\.)?github\.com\/.+$/i,
                  message: "Enter a valid GitHub URL",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>GitHub Link URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter GitHub link"
                      className="w-full border-[#dbdbdb] bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Link */}
            <FormField
              control={form.control}
              name="liveLink"
              rules={{
                required: "Live link is required",
                pattern: {
                  value: /^https?:\/\/.+$/i,
                  message: "Enter a valid live site URL",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Live Link URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter live site URL"
                      className="w-full border-[#dbdbdb] bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              rules={{ required: "At least one tag is required" }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Languages / Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter languages separated by commas (e.g. React, Node.js)"
                      className="w-full border-[#dbdbdb] bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4">
              Publish Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
