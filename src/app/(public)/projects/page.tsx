import ProjectCard from '@/components/modules/project/ProjectCard';
import React from 'react';

interface Project {
  id?: number;
  title?: string;
  content?: string;
  thumbnail?: string;
  githubLink?: string;
  liveLink?: string;
  tags:string[]
}

const ProjectPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/project", {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="py-30 px-4 max-w-7xl mx-auto text-center text-red-500">
        Failed to load projects 😢
      </div>
    );
  }

  const data = await res.json();
  const projects: Project[] = data?.data || data || [];

  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
