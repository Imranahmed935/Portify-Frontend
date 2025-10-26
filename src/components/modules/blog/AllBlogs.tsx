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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 lg:py-52 py-44">
        <Loader className="h-8 w-8 animate-spin text-white" />
        <span className="text-xl font-medium text-white">Loading...</span>
      </div>
    );
  }

  if (blogs.length === 0)
    return <p className="text-center py-10 text-white">No blogs found 😢</p>;

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8 w-full mx-auto">
      <h1 className="text-2xl sm:text-2xl font-bold mb-6 sm:text-left text-white">
        Manage Blogs
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
            {blogs.map((blog, index) => (
              <TableRow
                key={blog.id}
                className="hover:bg-zinc-700 transition-colors"
              >
                <TableCell className="text-gray-300 px-3 py-2 text-sm sm:text-base">
                  {index + 1}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-white px-3 py-2 text-sm sm:text-base">
                  {blog.title}
                </TableCell>
                <TableCell className="text-gray-300 px-3 py-2 text-sm sm:text-base">
                  {truncateContent(blog.content)}
                </TableCell>
                <TableCell className="text-gray-400 px-3 py-2 text-sm sm:text-base">
                  {formatDate(blog.createdAt)}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="flex justify-end gap-2 h-full flex-wrap sm:flex-nowrap">
                    <Button
                      onClick={() => onEditBlog(blog)}
                      variant="outline"
                      size="sm"
                      className="text-white border-gray-600 hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>

                    <Button
                      onClick={() => onDeleteBlog(blog.id)}
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700"
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

      {/* ✅ Modal Render */}
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
          modalClassName="w-full sm:w-[500px] md:w-[600px]" // Responsive width
        />
      )}
    </div>
  );
};

export default AllBlogs;
