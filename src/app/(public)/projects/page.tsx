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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
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
    <div className="py-30 px-4 max-w-7xl mx-auto space-y-6">
      <h1 className="font-bold text-2xl">
        Explore my latest Projects
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
