"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id?: string | number;
  title?: string;
  content?: string;
  thumbnail?: string;
  githubLink?: string;
  liveLink?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, content, thumbnail, githubLink, liveLink, tags } = project || {};

  return (
    <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title || "Project thumbnail"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors" />
      </div>

      {/* Header */}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-white line-clamp-1">
          {title || "Untitled Project"}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 pb-4 flex flex-col flex-grow justify-between">
        {/* Main Text Section */}
        <div className="space-y-3">
          <p className="text-zinc-400 text-sm line-clamp-2">
            {content || "No description available."}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
          {/* GitHub */}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}

          {/* Live */}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}

          {/* Details */}
          {id && (
            <Link
              href={`/projects/${id}`}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-400 font-medium text-sm transition-all"
            >
              Details <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
