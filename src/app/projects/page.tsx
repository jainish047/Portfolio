"use client";
import React, { useEffect, useState } from "react";
import allProjects, { ProjectType } from "@/data/projectList";
import ProjectCard from "@/components/ProjectCard";
import { tags } from "@/data/tags";
import { motion, AnimatePresence } from "framer-motion"; // ← Add at the top

const ProjectsPage = () => {
  const allTags = [...Object.values(tags)];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function managetagClick(tag: string | null) {
    if (selectedTag === tag) setSelectedTag(null);
    else setSelectedTag(tag);
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
        <span className="text-amber-600 font-bold">
          <i className="fa-solid fa-tags"></i> Tags:
        </span>
        {allTags.map((tag, index) => {
          return (
            // <span
            //   key={index}
            //   className={`border font-bold ${
            //     selectedTag === tag
            //       ? "bg-purple-600 text-white border-purple-600"
            //       : "bg-black/20 text-purple-600 border-purple-600"
            //   } rounded-full px-2 hover:cursor-pointer`}
            //   onClick={() => managetagClick(tag)}
            // >
            //   {tag}
            // </span>
            <span
              key={index}
              className={`transition-all duration-300 ease-in-out transform border font-bold ${
                selectedTag === tag
                  ? "scale-105 bg-purple-600 text-white border-purple-600"
                  : "scale-100 bg-black/20 text-purple-600 border-purple-600"
              } rounded-full px-2 hover:cursor-pointer`}
              onClick={() => managetagClick(tag)}
            >
              {tag}
            </span> 
          );
        })}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {/* {projects.map((project, index) => {
          return <ProjectCard key={index} project={project} />;
        })} */}
        <AnimatePresence mode="wait">
          {projects.map((project, index) => (
            <motion.div
              key={project.title + index + selectedTag} // ← ensures unique key per filter change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
