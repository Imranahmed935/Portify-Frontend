import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const { projectId } = params;

  const res = await fetch(`http://localhost:5000/api/v1/project/${projectId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <p className="text-center text-red-500 mt-10">Project not found</p>
    );
  }

  const projectData = await res.json();
  const { title, content, thumbnail, githubLink, liveLink, tags } =
    projectData?.data || {};

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 lg:py-44 py-32">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
          {/* Thumbnail */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title || "Project Thumbnail"}
              className="w-full h-[320px] object-cover rounded-t-2xl"
            />
          )}

          <CardContent className="p-6 space-y-4">
            {/* Title */}
            <h1 className="text-3xl font-semibold text-white">{title}</h1>

            {/* Tags */}
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-zinc-800 rounded-full text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">{content}</p>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Live Link */}
              {liveLink ? (
                <Link href={liveLink} target="_blank">
                  <Button>
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Site
                  </Button>
                </Link>
              ) : (
                <Button disabled className="opacity-60 cursor-not-allowed">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Site
                </Button>
              )}

              {/* GitHub Link */}
              {githubLink ? (
                <Link href={githubLink} target="_blank">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    <Github className="w-4 h-4 mr-2" /> GitHub
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  variant="outline"
                  className="border-gray-700 text-gray-500 opacity-60 cursor-not-allowed"
                >
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
