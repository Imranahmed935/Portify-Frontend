import React from 'react';

const ProjectPage = async () => {
    
    const res = await fetch("http://localhost:5000/api/v1/project", {
    cache: "no-store", // always fetch fresh data on SSR
  });

  if (!res.ok) {
    return (
      <div className="py-30 px-4 max-w-7xl mx-auto text-center text-red-500">
        Failed to load blogs 😢
      </div>
    );
  }

  const data = await res.json(); // ✅ await here
   const blogs = data?.data || data || [];
   console.log(blogs)
    return (
        <div>
            <h1>this is project page</h1>
        </div>
    );
};

export default ProjectPage;