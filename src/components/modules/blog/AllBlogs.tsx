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
import { formatDate, handleBlogDelete, truncateContent } from "@/utils/miniFuntion";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import BlogModal from "./BlogModal"; 

const AllBlogs = () => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);


  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/blog");
      const data = await res.json();
      setBlogs(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const onDeleteBlog = async (id: number) => {
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
      const deleteResult = await handleBlogDelete(id, token!);

      if (deleteResult.success) {
        toast.success("Deleted successfully 🗑️");
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error(deleteResult.message || "Delete failed ❌");
      }
    }
  };

  
  const onEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  if (loading) return <p>Loading blogs...</p>;
  if (blogs.length === 0) return <p>No blogs found 😢</p>;

  return (
    <div className="py-12 px-4 w-full mx-auto overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

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
            {blogs.map((blog, index) => (
              <TableRow
                key={blog.id}
                className="hover:bg-zinc-700 transition-colors"
              >
                <TableCell className="text-gray-300 px-4 py-2">{index + 1}</TableCell>
                <TableCell className="px-4 py-2">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-white px-4 py-2">
                  {blog.title}
                </TableCell>
                <TableCell className="text-gray-300 px-4 py-2">
                  {truncateContent(blog.content)}
                </TableCell>
                <TableCell className="text-gray-400 px-4 py-2">
                  {formatDate(blog.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex justify-end gap-2 h-full">
                    <Button
                      onClick={() => onEditBlog(blog)}
                      variant="outline"
                      size="sm"
                      className="text-white border-gray-600 hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                    </Button>

                    <Button
                      onClick={() => onDeleteBlog(blog.id)}
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700"
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

  
      {selectedBlog && (
        <BlogModal
          open={openModal}
          setOpen={setOpenModal}
          blog={selectedBlog}
          onUpdate={(updatedBlog: any) => {
      
            setBlogs((prev) =>
              prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            );
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AllBlogs;
