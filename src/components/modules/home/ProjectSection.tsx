import React from "react";
import Link from "next/link";
import ProjectCard from "../project/ProjectCard";
import { Project } from "@/types/project";

const ProjectSection = async () => {
  // Server-side fetch with ISR: revalidate every 60 seconds
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
    next: { revalidate: 30 }, 
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  const json = await res.json();
  const projects: Project[] = json.data || [];
  const displayedProjects = projects.slice(0, 6); // show first 6

  return (
    <section className="px-4 max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl">
        Explore my latest Projects
      </h1>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        A glimpse of some of my favorite projects I’ve built.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length > 6 && (
        <div className="text-center mt-10">
          <Link href="/projects">
            <button className="px-6 py-2 text-base bg-blue-500 text-white rounded">
              See More Projects
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
