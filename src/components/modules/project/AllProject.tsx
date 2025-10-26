/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Loader } from "lucide-react";
import { formatDate, handleDelete, truncateContent } from "@/utils/miniFuntion";
import { useSession } from "next-auth/react";
import ProjectModal from "./ProjectModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllProject = () => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`);
        const data = await res.json();
        setProjects(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const onDeleteProject = async (id: number, token1: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const deleteResult = await handleDelete(id, token1!);

      if (deleteResult.success) {
        toast.success("Deleted successfully 🗑️");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(deleteResult.message || "Delete failed ❌");
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center gap-2 p-4 lg:py-52 py-44">
      <Loader className="h-8 w-8 animate-spin text-white" />
      <span className="text-xl font-medium text-white">Loading...</span>
    </div>
  }
  if (projects.length === 0)
    return <p className="text-center py-10">No projects found 😢</p>;

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8 w-full mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Manage Projects
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <Table className="w-full min-w-[600px] sm:min-w-full bg-zinc-900 border border-zinc-800">
          <TableHeader>
            <TableRow className="bg-zinc-800">
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base">#</TableHead>
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base">Thumbnail</TableHead>
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base">Title</TableHead>
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base">Content</TableHead>
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base">Created At</TableHead>
              <TableHead className="text-white px-3 py-2 text-sm sm:text-base text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project, index) => (
              <TableRow
                key={project.id}
                className="hover:bg-zinc-700 transition-colors"
              >
                <TableCell className="text-gray-300 px-3 py-2 text-sm sm:text-base">
                  {index + 1}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-white px-3 py-2 text-sm sm:text-base">
                  {project.title}
                </TableCell>
                <TableCell className="text-gray-300 px-3 py-2 text-sm sm:text-base">
                  {truncateContent(project.content)}
                </TableCell>
                <TableCell className="text-gray-400 px-3 py-2 text-sm sm:text-base">
                  {formatDate(project.createdAt)}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="flex justify-end gap-2 h-full flex-wrap sm:flex-nowrap">
                    <Button
                      onClick={() => {
                        setSelectedProject(project);
                        setOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="text-white border-gray-600 hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700"
                      onClick={() => onDeleteProject(project.id, token!)}
                    >
                      <Trash className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <ProjectModal open={open} setOpen={setOpen} project={selectedProject} />
    </div>
  );
};

export default AllProject;
