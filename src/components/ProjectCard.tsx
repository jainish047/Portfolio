'use client'
import { ProjectType } from "@/data/projectList";
import { useSelectedProjectStore } from "@/store/selectedProjectStore";

export default function ProjectCard({ project }: { project: ProjectType }) {

  const {
    title,
    description,
    // fullDescription,
    imageUrl,
    githubUrl,
    liveUrl,
    specialTags,
    tags,
    majorTechnologies,
    // features,
  } = project;

  const setSelectedProject = useSelectedProjectStore(
    (state) => state.setSelectedProject
  );

  // set once (prevent infinite re-renders)
  // if (typeof window !== "undefined") {
  //   setSelectedProject(project); // You can also set it from API/localStorage etc.
  // }

  return (
    <div
      className="border border-blue-500 bg-slate-500/10 backdrop-blur-sm shadow-md rounded-lg overflow-hidden p-4 flex flex-col md:flex-row md:items-start gap-4 hover:cursor-pointer"
      onClick={() => {
        setSelectedProject(project);
      }}
    >
      <img
        src={
          imageUrl && imageUrl !== ""
            ? imageUrl
            : "https://placehold.co/300x200?text=Tech+Card&font=roboto"
        }
        alt={title}
        className="w-full h-48 object-cover border rounded-sm flex-1"
        style={{ maxWidth: "300px", maxHeight: "200px" }}
      />
      <div className="flex flex-wrap gap-2 mb-4 absolute p-2">
        {specialTags.map((tag, index) => (
          <span
            key={index}
            className="border-2 border-amber-400 bg-amber-100 text-amber-600 px-1 rounded-sm text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-between h-full">
        <div className="">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="border-2 border-green-500 bg-green-100 text-green-700 px-1 rounded-sm text-sm"
              >
                {tag}
              </span>
            ))}
            {/* green: border-green-500 bg-green-100 text-green-700 */}
            {/* purple: border-purple-500 bg-purple-100 text-purple-700 */}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {majorTechnologies.map((tech, index) => (
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
          {/* <p className="text-gray-600 mb-4">{fullDescription}</p> */}
          {/* <ul className="list-disc list-inside mb-4">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul> */}
        </div>
        <div className="flex justify-between">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on GitHub
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
