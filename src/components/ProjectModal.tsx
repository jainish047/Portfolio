"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelectedProjectStore } from "@/store/selectedProjectStore";
// in _app.tsx or directly in component
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function ProjectModal() {
  //   const [selectedProject, setSelectedProject] = useSelectedProjectStore(
  //     (store) => [store.selectedProject, store.setSelectedProject],
  //     shallow
  //   );

  const { selectedProject, setSelectedProject } = useSelectedProjectStore(
    (store) => store
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // All hooks must be above conditional returns
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelectedProject]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //   if (!isMounted || !selectedProject) return null;
  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          onClick={() => setSelectedProject(null)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative bg-gray-900/60 text-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-screen p-0"
        >
          <div className="p-6 overflow-y-auto max-h-[90vh]">
            <header className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-white text-2xl hover:text-red-400 flex justify-center items-center"
              >
                ✖
              </button>
            </header>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12c0 5.302 
             3.438 9.8 8.207 11.385.6.113.793-.26.793-.577 
             0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 
             17.07 3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 
             1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.809 
             1.304 3.495.997.108-.775.418-1.304.76-1.604-2.665-.305-5.467-1.333-5.467-5.931 
             0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 
             0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.403c1.018.005 
             2.045.138 3.003.403 2.291-1.552 3.297-1.23 
             3.297-1.23.653 1.653.241 2.874.119 3.176.77.84 
             1.233 1.911 1.233 3.221 0 4.61-2.807 
             5.624-5.479 5.921.43.372.823 1.103.823 
             2.222 0 1.606-.015 2.898-.015 3.293 
             0 .32.192.694.801.576C20.565 21.796 
             24 17.298 24 12c0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
                </a>
              )}

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7" />
                    <path d="M10 14L21 3" />
                    <path d="M21 21H3V3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>

            <div
              ref={sliderRef}
              className="keen-slider my-4 rounded-md overflow-hidden"
            >
              {(
                (selectedProject.moreImageUrls &&
                  selectedProject.moreImageUrls.length > 0 &&
                  selectedProject.moreImageUrls) ||
                Array(5).fill(
                  "https://placehold.co/300x200?text=Tech+Card&font=roboto"
                )
              ).map((src, i) => (
                <div
                  key={i}
                  className="keen-slider__slide flex justify-center items-center"
                >
                  <img
                    src={src}
                    className="max-h-80 object-contain rounded-md"
                    alt={`slide-${i}`}
                  />
                </div>
              ))}
            </div>
            {/* Pagination Dots */}
            {loaded && instanceRef.current && (
              <div className="flex justify-center gap-2 mt-4">
                {(
                  (selectedProject.moreImageUrls &&
                    selectedProject.moreImageUrls.length > 0 &&
                    selectedProject.moreImageUrls) ||
                  Array(5).fill(
                    "https://placehold.co/300x200?text=Tech+Card&font=roboto"
                  )
                ).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === idx
                        ? "bg-white scale-110"
                        : "bg-white/30 hover:bg-white/60"
                    } transition-all`}
                  />
                ))}
              </div>
            )}
            <div className="my-2">
              <p className="text-white text-xl">Description:</p>
              <p className="text-zinc-300 text-justify">
                {selectedProject.fullDescription}
              </p>
            </div>
            <div className="my-2">
              <p className="text-white text-xl">Features:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
                {selectedProject.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex justify-start items-start gap-2 bg-gray-800 rounded-xl p-2 shadow-inner"
                  >
                    <span className="text-green-400">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white text-xl">Major Technology:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.majorTechnologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center border rounded-full px-2 text-sm *:border-zinc-500 bg-zinc-100 text-zinc-800 bg-opacity-20"
                  >
                    {tech && tech.imageUrl && tech.imageUrl !== "" && (
                      <img
                        key={index}
                        src={tech.imageUrl}
                        alt={""}
                        className="w-3.5 h-3.5"
                      />
                    )}
                    <span className="ml-2">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-xl">Other Technology:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(selectedProject.otherTechnologies || [])
                  .filter((tech) => tech !== undefined && tech !== null)
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded-full px-2 text-sm *:border-zinc-500 bg-zinc-100 text-zinc-800 bg-opacity-20"
                  >
                    {tech && tech.imageUrl && tech.imageUrl !== "" && (
                      <img
                        key={index}
                        src={tech.imageUrl}
                        alt={""}
                        className="w-3.5 h-3.5"
                      />
                    )}
                    <span className="ml-2">{tech.name}</span>
                  </div>
                ))}
                {/* {(selectedProject.otherTechnologies || [])
                  .filter((tech) => tech !== undefined && tech !== null)
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded-full px-2 text-sm *:border-zinc-500 bg-zinc-100 text-zinc-800 bg-opacity-20"
                    >
                      {tech.name}
                    </div>
                  ))} */}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
