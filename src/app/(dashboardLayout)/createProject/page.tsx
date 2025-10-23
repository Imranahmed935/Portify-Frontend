"use client";

import React, { useState } from "react";

import { Plus, X } from "lucide-react";
import ProjectForm from "@/components/modules/project/ProjectFrom";
import { Button } from "@/components/ui/button";
import AllProject from "@/components/modules/project/AllProject";

const CreateProjectPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      {!showForm ? (
        <Button
          className="flex items-center gap-2  text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Create Project
        </Button>
      ) : (
        <div className="w-full max-w-4xl">
          <ProjectForm />
          <button
            className="flex items-center gap-2 mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={() => setShowForm(false)}
          >
            <X size={18} />
            Close Form
          </button>
        </div>
      )}


      <div>
        <AllProject/>
      </div>
    </div>
  );
};

export default CreateProjectPage;
