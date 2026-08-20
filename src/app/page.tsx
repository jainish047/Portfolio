'use client';
import React from "react";
import Link from "next/link";
import { motion, easeInOut } from "framer-motion";
import projectList from "@/data/projectList";
import ProjectCard from "@/components/ProjectCard";
import TerminalTypewriter from "@/components/TerminalTypewriter";
import TerminalButton from "@/components/TerminalButton";
import GlitchName from "@/components/GlitchName";
import SolarSystemSection from "@/components/SolarSystemSection";
import MissionTimeline from "@/components/MissionTimeline";

// const skills = ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "DSA"];

const milestones = [
  { year: "2021", title: "96.13% GSEB 12th Board" },
  { year: "2022", title: "Started B.Tech @ GCET (IT)" },
  { year: "2024", title: "Won SIH for ZenSkills Platform" },
  // { year: "2025", title: "Built IELTS AI Evaluator App" },
];

const Projects = [...projectList.slice(0, 3)];

const sectionMotion = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeInOut },
  viewport: { once: true },
};

const HomePage = () => {
  return (
    <div className="text-white mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-7xl px-4 py-8">
      {/* Hero Section */}
      <motion.section
        {...sectionMotion}
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 col-span-full"
      >
        <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4 glitch-name-done">
          <GlitchName text="Jainish Patel" startDelay={200} />
        </h1>
        <div className="max-w-2xl mb-8">
          <p className="text-xl md:text-2xl font-orbitron font-bold text-gray-300 mb-6">
            <TerminalTypewriter
              text="Web Developer, Problem Solver & AI/ML Explorer"
              speed={42}
              startDelay={1400}
              hideCursorWhenDone
            />
          </p>
          <p className="font-bold text-xl">
            <TerminalTypewriter
              text="Blending clean code with intelligent systems."
              speed={38}
              startDelay={3000}
              hideCursorWhenDone
            />
          </p>
          <p className="font-bold text-xl">
            <TerminalTypewriter
              text="On a mission to craft meaningful software across the web and AI universe."
              speed={38}
              startDelay={5100}
            />
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <Link href="/projects" className="w-full sm:w-auto flex justify-center">
            <TerminalButton label="LAUNCH_PROJECTS" variant="primary" />
          </Link>
          <Link href="/about" className="w-full sm:w-auto flex justify-center">
            <TerminalButton label="ABOUT_ME" variant="secondary" />
          </Link>
        </div>
      </motion.section>

      {/* Skills Section – free-floating, no box */}
      <motion.section
        {...sectionMotion}
        className="col-span-full w-full py-4 px-2"
      >
        <SolarSystemSection
          systems={[
            {
              label: 'Web Dev',
              icon: '💻',
              skills: ['React', 'Next.js', 'Tailwind', 'Node.js', 'Express.js'],
              starIndex: 0, // yellow dwarf
            },
            {
              label: 'Backend',
              icon: '🗄️',
              skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'REST APIs'],
              starIndex: 1, // blue-white
            },
            {
              label: 'CS Core',
              icon: '🧠',
              skills: ['DSA', 'C++ STL', 'OOP', 'Problem Solving'],
              starIndex: 2, // red dwarf
            },
          ]}
        />
        <div className="text-center mt-2">
          <Link
            href="/about#skills"
            className="text-sm font-semibold text-blue-400 underline hover:text-blue-300"
          >
            Explore My Full Skill Stack →
          </Link>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        {...sectionMotion}
        className="col-span-full w-full py-4 px-2"
      >
        <MissionTimeline milestones={milestones} />
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        {...sectionMotion}
        id="projects"
        className="col-span-full w-full py-4 px-2"
      >
        <div className="flex justify-center md:justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="hidden md:block text-sm font-semibold text-blue-400 underline hover:text-blue-300"
          >
            Explore All Projects →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
        <Link
          href="/projects"
          className="block md:hidden text-center mt-6 text-sm font-semibold text-blue-400 underline hover:text-blue-300"
        >
          Explore All Projects →
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="col-span-full text-center w-full text-sm text-gray-400 mt-16 mb-8">
        © 2025 Jainish Patel. Made with 💜 in the Milky Way.
      </footer>
    </div>
  );
};

export default HomePage;
