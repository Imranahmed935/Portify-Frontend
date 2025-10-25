"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import ProjectForm from "@/components/modules/project/ProjectFrom";
import { Button } from "@/components/ui/button";
import AllProject from "@/components/modules/project/AllProject";

const CreateProjectPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      {!showForm ? (
        <Button
          className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Create Project
        </Button>
      ) : (
        <div className="w-full max-w-4xl relative">
          {/* ProjectForm with onClose prop */}
          <ProjectForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <div>
        <AllProject />
      </div>
    </div>
  );
};

export default CreateProjectPage;
