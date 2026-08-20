"use client";
import { ProjectType } from "@/data/projectList";
import { useSelectedProjectStore } from "@/store/selectedProjectStore";

export default function ProjectCard({ project }: { project: ProjectType }) {
  const {
    title,
    description,
    imageUrl,
    githubUrl,
    liveUrl,
    specialTags,
    tags,
    majorTechnologies,
  } = project;

  const setSelectedProject = useSelectedProjectStore(
    (state) => state.setSelectedProject
  );

  return (
    /* Outer wrapper – needed so the star particle is positioned relative to the full card */
    <div
      className="relative rounded-lg cursor-pointer group"
      onClick={() => setSelectedProject(project)}
    >
      {/* ── Single glowing star that walks the entire border ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, rgba(167,139,250,1) 45%, transparent 100%)',
          boxShadow:
            '0 0 8px 3px rgba(167,139,250,0.95), 0 0 20px 8px rgba(96,165,250,0.5)',
          animation: 'star-walk 7s linear infinite',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* ── Card body – same translucent style as original ── */}
      <div className="border border-blue-500/60 bg-slate-500/10 backdrop-blur-sm rounded-lg overflow-hidden p-4 h-full flex flex-col md:flex-row md:items-start gap-4 transition-all duration-300 group-hover:border-purple-400/60 group-hover:shadow-[0_0_28px_6px_rgba(139,92,246,0.2)]">

        {/* Project image */}
        <div className="relative flex-shrink-0 self-start">
          {/* Special tags float over image */}
          {specialTags.length > 0 && (
            <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
              {specialTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-bold px-2 py-0.5 rounded-sm"
                  style={{
                    background: 'rgba(251,191,36,0.15)',
                    border: '1px solid rgba(251,191,36,0.6)',
                    color: '#fbbf24',
                    textShadow: '0 0 8px rgba(251,191,36,0.5)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <img
            src={
              imageUrl && imageUrl !== ""
                ? imageUrl
                : "https://placehold.co/300x200?text=Project&font=roboto"
            }
            alt={title}
            className="w-full h-48 object-contain border rounded-sm bg-white"
            style={{ maxWidth: 300, maxHeight: 200 }}
          />
        </div>

        {/* Card body text */}
        <div className="flex-1 flex flex-col justify-between h-full min-w-0">
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{description}</p>

            {/* Category tags – nebula style (purple/blue) */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      border: '1px solid rgba(139,92,246,0.6)',
                      background: 'rgba(139,92,246,0.12)',
                      color: '#c4b5fd',
                      boxShadow: '0 0 6px rgba(139,92,246,0.2)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Tech chips */}
            {majorTechnologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {majorTechnologies.map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full"
                    style={{
                      border: '1px solid rgba(96,165,250,0.4)',
                      background: 'rgba(96,165,250,0.08)',
                      color: '#93c5fd',
                    }}
                  >
                    {tech?.imageUrl && tech.imageUrl !== "" && (
                      <img src={tech.imageUrl} alt="" className="w-3 h-3" />
                    )}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action links */}
          <div className="flex gap-3 mt-auto">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-purple-900/30"
              style={{
                border: '1px solid rgba(139,92,246,0.5)',
                color: '#c4b5fd',
              }}
            >
              ↗ GitHub
            </a>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-900/30"
                style={{
                  border: '1px solid rgba(96,165,250,0.5)',
                  color: '#93c5fd',
                }}
              >
                ↗ Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
