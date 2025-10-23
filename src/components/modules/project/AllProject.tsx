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
import { Trash, Edit } from "lucide-react";
import { formatDate, handleDelete, truncateContent } from "@/utils/miniFuntion";
import { useSession } from "next-auth/react";

const AllProject = () => {
  const session = useSession()
  const token = session.data?.user.accessToken;
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/project");
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


  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects found 😢</p>;

  return (
    <div className="py-12 px-4 w-full mx-auto overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Project</h1>

      <div className="rounded-xl overflow-hidden shadow-md">
        <Table className="w-full bg-zinc-900 border border-zinc-800">
          <TableHeader>
            <TableRow className="bg-zinc-800">
              <TableHead className="text-white px-4 py-2">#</TableHead>
              <TableHead className="text-white px-4 py-2">Thumbnail</TableHead>
              <TableHead className="text-white px-4 py-2">Title</TableHead>
              <TableHead className="text-white px-4 py-2">Content</TableHead>
              <TableHead className="text-white px-4 py-2">Created At</TableHead>
              <TableHead className="text-white px-4 py-2 text-right">
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
                <TableCell className="text-gray-300 px-4 py-2">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-white px-4 py-2">
                  {project.title}
                </TableCell>
                <TableCell className="text-gray-300 px-4 py-2">
                  {truncateContent(project.content)}
                </TableCell>
                <TableCell className="text-gray-400 px-4 py-2">
                  {formatDate(project.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex justify-end gap-2 h-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white border-gray-600 hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700"
                      onClick={()=>handleDelete(project.id, token!)}
                    >
                      <Trash className="w-4 h-4 mr-1" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllProject;
