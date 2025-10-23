"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, ArrowBigRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id?: number;
  title?: string;
  content?: string;
  thumbnail?: string;
  githubLink?: string;
  liveLink?: string;
  tags:string[]
}

const ProjectCard = ({ project }:{project:Project}) => {
  const { id, title, content, thumbnail, githubLink, liveLink, tags } = project || {};

  return (
    <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors" />
      </div>

      {/* Header */}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 pb-4 flex flex-col flex-grow justify-between">
        {/* Main Text Section */}
        <div className="space-y-3">
          <p className="text-zinc-400 text-sm line-clamp-2">{content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag:string, i:number) => (
              <span
                key={i}
                className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons Row (Stays at Bottom) */}
        <div className="flex justify-between items-center mt-5">
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
              Details <ArrowBigRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
