"use client";
import React, { useState } from "react";
import SideBar from "@/components/shared/Sidebar/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">

      <div className={`fixed top-0 left-0 h-full bg-gray-900 z-50 transition-transform transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:w-56 w-64`}>
        <SideBar closeSidebar={() => setSidebarOpen(false)} />
      </div>

  
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

 
      <main className="flex-1 ml-0 lg:ml-56">

        <div className="lg:hidden p-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-700">
          <button
            className="p-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">Portify</h1>
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
