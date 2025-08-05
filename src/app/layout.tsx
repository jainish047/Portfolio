"use client";
// import type { Metadata } from "next";
import "./globals.css";
import SpaceBackground from "@/components/background";
import GalacticMenu from "@/components/GalacticMenu";
import { Orbitron, Rajdhani } from "next/font/google";
import { useSelectedProjectStore } from "@/store/selectedProjectStore";

import ProjectModal from "@/components/ProjectModal";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"], // font-normal, bold, black
  variable: "--font-orbitron",
  display: "swap", // Better loading performance
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // font-light, normal, medium, semi-bold, bold
  variable: "--font-rajdhani",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Jainish Patel - Portfolio",
//   description: "This is my portfolio website showcasing my work and skills.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const selectedProject = useSelectedProjectStore((store) => store.selectedProject);

  return (
    // <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
    // <html lang="en">
    <html
      lang="en"
      className={`font-rajdhani antialiased ${rajdhani.variable} ${orbitron.variable}`}
    >
      <body className="m-0 p-0 overflow-x-hidden">
        
        <SpaceBackground />
        {!selectedProject && <GalacticMenu />}

        {/* 3) Your scrolling content */}
        <main className="relative z-0">{children}</main>

        {selectedProject && <ProjectModal />}
      </body>
    </html>
  );
}
