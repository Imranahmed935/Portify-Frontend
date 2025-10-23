import ProjectCard from '@/components/modules/project/ProjectCard';
import React from 'react';

const ProjectPage = async () => {
    
    const res = await fetch("http://localhost:5000/api/v1/project", {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="py-30 px-4 max-w-7xl mx-auto text-center text-red-500">
        Failed to load blogs 😢
      </div>
    );
  }

  const data = await res.json();
   const projects = data?.data || data || [];
   console.log(projects)
    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {
              projects.map(project =><ProjectCard key={project.id}
              project={project}
              ></ProjectCard>)
            }
            </div>
        </div>
    );
};

export default ProjectPage;