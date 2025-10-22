
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

const ProjectForm = () => {
  const { data: session, status } = useSession();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      githubLink: "",
      LiveLink: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    if (status !== "authenticated") {
      alert("You must be logged in to create a blog");
      return;
    }

    const { title, content, thumbnail, githubLink, LiveLink } = values;
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
      const res = await fetch("http://localhost:5000/api/v1/project/create", {
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
          LiveLink,
          tags: projectInfo.tags,
          authorId: session?.user?.id,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Failed to create project");
        return;
      }

      const data = await res.json();
      console.log("✅ Project created:", data);
      alert("Project created successfully!");
    } catch (error) {
      console.error("❌ Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-0 py-12">
      <div className="w-full max-w-3xl bg-zinc-900 p-10 rounded-xl shadow-lg space-y-8">
        <h2 className="text-4xl font-semibold text-left">Create Project</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
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
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your project content here..."
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
            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>GithubLink URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter githubLink URL"
                      className="w-full border-[#dbdbdb] bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>LiveLink URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter liveLink URL"
                      className="w-full border-[#dbdbdb] bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Language with comma(,)"
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
