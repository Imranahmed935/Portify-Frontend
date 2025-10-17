
import SideBar from "@/components/shared/Sidebar/SideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-4">
    <SideBar/>
    {children}
    </div>;
};

export default layout;
