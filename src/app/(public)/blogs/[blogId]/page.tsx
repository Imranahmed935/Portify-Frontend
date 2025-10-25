import React from "react";

interface Blog {
  id?: number;
  title?: string;
  content?: string;
  authorId?: number;
  thumbnail?: string;
  views?: number;
}

export const generateStaticParams = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/blog`);
  const { data: blogs } = await res.json();

  return blogs.map((blog: Blog) => ({
    blogId: String(blog.id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const { blogId } = params;

  const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return { title: "Blog Not Found" };
  }

  const blogData = await res.json();
  const details: Blog = blogData.data;

  return {
    title: details?.title || "Blog Details",
  };
};


const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`);
  if (!res.ok) {
    return (
      <p className="text-center text-red-500 mt-10">Post not found</p>
    );
  }

  const blogData = await res.json();
  const details: Blog = blogData.data;

  return (
    <div className="lg:py-44 py-32">
      <h1 className="text-white text-center mb-6 text-3xl">Blog Details</h1>
      <div className="px-4 max-w-4xl mx-auto bg-[#18181b] text-white rounded-lg shadow-md">
        {details.thumbnail && (
          <div className="h-64 overflow-hidden rounded-lg mb-4">
            <img
              src={details.thumbnail}
              alt={details.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4">{details.title}</h1>

        <div className="flex items-center text-gray-400 text-sm mb-6">
          <span className="mr-4">
            Author ID: {details.authorId ?? "Unknown"}
          </span>
          <span>Views: {details.views ?? 0}</span>
        </div>

        <div className="text-gray-200 text-base leading-relaxed">
          {details.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
