"use client";
import React, { useEffect, useState } from "react";
import allProjects, { ProjectType } from "@/data/projectList";
import ProjectCard from "@/components/ProjectCard";
import { tags } from "@/data/tags";

const ProjectsPage = () => {
  const allTags = [...Object.values(tags)];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function managetagClick(tag:string | null){
    if(selectedTag===tag) setSelectedTag(null);
    else                  setSelectedTag(tag);
  }

  useEffect(() => {
    // filter projects based on selected tags
    if (selectedTag) {
      const filteredProjects = allProjects.filter(
        (project) =>
          project.tags.includes(selectedTag) ||
          project.specialTags.includes(selectedTag) ||
          project.hiddenTags.includes(selectedTag)
      );
      setProjects(filteredProjects);
    } else {
      setProjects(allProjects);
    }
  }, [selectedTag, allProjects]);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex flex-wrap gap-2 border border-amber-400 bg-amber-400/15 backdrop-blur-sm  p-2 rounded-md">
      <span className="text-amber-600 font-bold"><i className="fa-solid fa-tags"></i> Tags:</span>
        {allTags.map((tag, index) => {
          return (
            <span
              key={index}
              className={`border font-bold ${
                selectedTag === tag
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-black/20 text-purple-600 border-purple-600"
              } rounded-full px-2 hover:cursor-pointer`}
              onClick={()=>managetagClick(tag)}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {projects.map((project, index) => {
          return <ProjectCard key={index} project={project} />;
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
