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
import { handleUpdate } from "@/utils/miniFuntion";

const ProjectModal = ({ open, setOpen, project }: any) => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    githubLink: "",
    liveLink: "",
    tags: "", // keep as string for input
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        content: project.content || "",
        thumbnail: project.thumbnail || "",
        githubLink: project.githubLink || "",
        liveLink: project.liveLink || "",
        tags: Array.isArray(project.tags) ? project.tags.join(", ") : "", // join array → string
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // convert tags string back → array
    const updatedData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    await handleUpdate(project.id, token!, updatedData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Modify the project details below and click update.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter project description"
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

          <div>
            <label className="text-sm font-medium">GitHub Link</label>
            <Input
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="Enter GitHub link"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Live Link</label>
            <Input
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="Enter live site link"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Languages / Tags</label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma separated (e.g. React, Node, MongoDB)"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Update Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
