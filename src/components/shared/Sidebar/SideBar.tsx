"use client";
import React from "react";
import Link from "next/link";
import { Home, FolderPlus, FilePlus, LogOut, BarChart2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SideBarProps {
  closeSidebar?: () => void; 
}

const SideBar: React.FC<SideBarProps> = ({ closeSidebar }) => {
  const session = useSession();

  return (
    <div className="flex flex-col justify-between h-full p-6 text-white">
      <div>
        <h2 className="lg:text-4xl text-2xl font-bold mb-6 text-blue-500 text-center">
          Portify
        </h2>

        <nav className="flex flex-col space-y-4">
          {[
            { href: "/", label: "Home", icon: <Home size={20} /> },
            { href: "/dashboard", label: "Stats", icon: <BarChart2 size={20} /> },
            { href: "/createProject", label: "Create Project", icon: <FolderPlus size={20} /> },
            { href: "/createBlog", label: "Create Blog", icon: <FilePlus size={20} /> },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar} 
              className="flex items-center space-x-3 hover:bg-slate-700 p-2 rounded-md transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

 
      <div className="border-t border-gray-500 pt-4">
        {session.status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
