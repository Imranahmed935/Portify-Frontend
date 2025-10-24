"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectCard from "../project/ProjectCard";
import { Project } from "@/types/project"; // ✅ import shared type

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjectsCount, setAllProjectsCount] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/project");
        if (!res.ok) throw new Error("Failed to fetch projects");

        const json = await res.json();
        const projectData: Project[] = json.data || [];
        setAllProjectsCount(projectData.length);
        setProjects(projectData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className=" px-4 max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl">
        Explore my latest Projects
      </h1>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        A glimpse of some of my favorite projects I’ve built.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {allProjectsCount > 6 && (
        <div className="text-center mt-10">
          <Link href="/projects">
            <Button className="px-6 py-2 text-base">See More Projects</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
