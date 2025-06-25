"use client";
import ProjectModal from "@/components/ProjectModal";
import { useSelectedProjectStore } from "@/store/selectedProjectStore";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const isMounted = useIsMounted();
  const selectedProject = useSelectedProjectStore(
    (store) => store.selectedProject
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center p-4">
      <header className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold font-orbitron mb-4">Jainish Patel</h1>
        <h1 className="text-3xl font-bold font-orbitron">Projects</h1>
      </header>
      {children}
      {selectedProject && <ProjectModal />}
    </div>
  );
}
