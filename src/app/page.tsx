'use client';
import React from "react";
import Link from "next/link";
import { motion, easeInOut } from "framer-motion";
import projectList from "@/data/projectList";
import ProjectCard from "@/components/ProjectCard";

// const skills = ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "DSA"];

const milestones = [
  { year: "2021", title: "96.13% GSEB 12th Board"}
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
        <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4">
          Jainish Patel
        </h1>
        <div className="max-w-2xl mb-8">
          <p className="text-xl md:text-2xl font-orbitron font-bold text-gray-300 mb-6">
            Web Developer, Problem Solver & AI/ML Explorer
          </p>
          <p className="font-bold">
            Blending clean code with intelligent systems.
          </p>
          <p className="font-bold">
            On a mission to craft meaningful software across the web and AI
            universe.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/projects">
            <button className="font-semibold border-2 border-blue-600 bg-blue-600/50 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow hover:cursor-pointer">
              View Projects
            </button>
          </Link>
          <Link href="/about">
            <button className="font-semibold border-2 border-blue-600 bg-blue-600/50 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow hover:cursor-pointer">
              About Me
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        {...sectionMotion}
        className="w-full h-full p-6 backdrop-blur-md border-2 border-blue-800 bg-black/30 rounded-xl col-span-1 md:col-span-2"
      >
        <div className="flex justify-center md:justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-center">
            My Core Tech Pillars
          </h2>
          <Link
            href="/about#skills"
            className="md:block hidden text-center text-lg font-semibold text-blue-400 underline hover:text-blue-300"
          >
            Explore My Full Skill Stack →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Web Dev */}
          <div className="bg-purple-800/30 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-bold mb-4">💻 Web Development</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>Express.js</li>
            </ul>
          </div>

          {/* Database / Backend */}
          <div className="bg-blue-800/30 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-bold mb-4">🗄️ Backend & Databases</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Prisma ORM</li>
              <li>REST APIs</li>
            </ul>
          </div>

          {/* DSA / CS Fundamentals */}
          <div className="bg-indigo-800/30 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-bold mb-4">🧠 CS Fundamentals</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Data Structures & Algorithms</li>
              <li>C++ STL</li>
              <li>OOP Concepts</li>
              <li>Problem Solving</li>
            </ul>
          </div>
        </div>

        <Link
          href="/about#skills"
          className="block md:hidden text-center mt-8 text-lg font-semibold text-blue-400 underline hover:text-blue-300"
        >
          Explore My Full Skill Stack →
        </Link>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        {...sectionMotion}
        className="h-full w-full p-6 backdrop-blur-md border-2 border-blue-800 bg-black/30 rounded-xl col-span-1"
      >
        <div className="flex justify-center md:justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">My Journey</h2>
          <Link
            href="/about#timeline"
            className="md:block hidden text-lg font-semibold text-blue-400 underline hover:text-blue-300"
          >
            View Full Timeline →
          </Link>
        </div>
        <div className="space-y-4 border-l-2 border-purple-500 pl-4">
          {milestones.map((milestone, idx) => (
            <div key={idx}>
              <p className="text-lg font-semibold">{milestone.year}</p>
              <p className="text-gray-300">{milestone.title}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about#timeline"
          className="text-blue-400 underline text-lg font-semibold text-center hover:text-blue-300 mt-4 md:hidden block"
        >
          View Full Timeline →
        </Link>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        {...sectionMotion}
        id="projects"
        className="w-full py-6 px-2 not-last:md:p-6 backdrop-blur-md border-2 border-blue-800 bg-black-900/30 rounded-xl col-span-1 md:col-span-3"
      >
        <div className="flex justify-center md:justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="hidden md:block text-center text-lg font-semibold text-blue-400 underline hover:text-blue-300"
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
          className="block md:hidden text-center mt-6 text-lg font-semibold text-blue-400 underline hover:text-blue-300"
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
