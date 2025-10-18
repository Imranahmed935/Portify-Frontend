"use client";
import React from "react";
import Link from "next/link";
import { Home, FolderPlus, FilePlus, LogOut } from "lucide-react";

const SideBar = () => {
  return (
    <div className="fixed top-0 bottom-0 border-r border-r-gray-400 text-white w-56 h-screen p-6  flex flex-col justify-between">
  
      <div>
      
        <h2 className="lg:text-4xl text-2xl font-bold mb-6 text-blue-500 text-center">Portify</h2>

       
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:bg-slate-700 p-2 rounded-md transition"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            href="/createProject"
            className="flex items-center space-x-3 hover:bg-slate-700 p-2 rounded-md transition"
          >
            <FolderPlus size={20} />
            <span>Create Project</span>
          </Link>

          <Link
            href="/createBlog"
            className="flex items-center space-x-3 hover:bg-slate-700 p-2 rounded-md transition"
          >
            <FilePlus size={20} />
            <span>Create Blog</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <button className="flex items-center space-x-3 bg-red-600 p-2 rounded-md transition mt-6">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideBar;
