"use client";

import React, { useEffect, useState } from "react";
import { allBlogs, allProjects } from "@/utils/miniFuntion";
import { useSession } from "next-auth/react";
import { FileText, Folder, BarChart2 } from "lucide-react";
import Stats from "@/components/shared/Stats";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [blogsCount, setBlogsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await allBlogs();
      const projects = await allProjects();

      setBlogsCount(blogs?.data.length || 0);
      setProjectsCount(projects?.data.length || 0);
    };

    fetchData();
  }, []);

  return (
    <div className="lg:p-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome Back{" "}
        <span className="text-blue-500">{session?.user?.role}</span>!
      </h1>
      <hr className="my-4" />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#101828] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white">
          <FileText className="w-8 h-8 mb-3 text-blue-400" />
          <span className="text-2xl lg:text-4xl font-bold">{blogsCount}</span>
          <p className="text-sm mt-1">Total Blogs</p>
        </div>


        <div className="bg-[#101828] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white">
          <Folder className="w-8 h-8 mb-3 text-green-400" />
          <span className="text-2xl lg:text-4xl font-bold">{projectsCount}</span>
          <p className="text-sm mt-1">Total Projects</p>
        </div>

        <div className="bg-[#101828] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white">
          <BarChart2 className="w-8 h-8 mb-3 text-purple-400" />
          <span className="text-2xl lg:text-4xl font-bold">100+</span>
          <p className="text-sm mt-1">Other Metric</p>
        </div>
      </div>
      <Stats/>
    </div>
  );
};

export default DashboardPage;
