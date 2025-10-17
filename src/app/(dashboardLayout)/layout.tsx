
import SideBar from "@/components/shared/Sidebar/SideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-4">
    <SideBar/>
    <main className="flex-1">{children}</main>
    </div>;
};

export default layout;
