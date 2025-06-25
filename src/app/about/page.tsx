import React from "react";
import Head from "next/head";
import Link from "next/link";
import { technologyIcons } from "@/data/tags";

const achievements = [
  "🏆 Winner of Smart India Hackathon 2024 – ZenSkills Mentorship Platform",
  "🧠 Solved 600+ DSA problems across LeetCode, Codeforces, and CodeChef",
  "📈 CGPA of 9.43 after 6 semesters at GCET (IT Branch)",
];

const techCategories = [
  {
    title: "Languages",
    items: [
      technologyIcons["JavaScript"],
      technologyIcons["TypeScript"],
      technologyIcons["C++"],
      technologyIcons["Python"],
      technologyIcons["Java"],
      technologyIcons["HTML"],
    ],
  },
  {
    title: "Frontend",
    items: [
      technologyIcons["Reactjs"],
      technologyIcons["Nextjs"],
      technologyIcons["TailwindCSS"],
      technologyIcons["Bootstrap"],
      technologyIcons["ReduxToolkit"],
      technologyIcons["ReactRouter"],
      technologyIcons["Formik"],
      technologyIcons["Yup"],
      technologyIcons["FramerMotion"],
    ],
  },
  {
    title: "Backend",
    items: [
      technologyIcons["Nodejs"],
      technologyIcons["Express.js"],
      technologyIcons["PostgreSQL"],
      technologyIcons["MongoDB"],
      technologyIcons["Firebase"],
      technologyIcons["Prisma ORM"],
      technologyIcons["Mongoose"],
      technologyIcons["Nodemailer"],
      technologyIcons["Socket.IO"],
    ],
  },
  {
    title: "AI/ML & APIs",
    items: [
      technologyIcons["OpenAI"],
      technologyIcons["HuggingFace API"],
      technologyIcons["Grok NLP"],
      technologyIcons["AssemblyAI"],
      technologyIcons["VideoSDK"],
      technologyIcons["cashfree"],
    ],
  },
  {
    title: "Tools",
    items: [
      technologyIcons["Git"],
      technologyIcons["Postman"],
      technologyIcons["Docker"],
      technologyIcons["Kubernetes"],
      technologyIcons["Vercel"],
    ],
  },
  {
    title: "Other Technologies",
    items: [
      technologyIcons["Axios"],
      technologyIcons["Chartjs"],
      technologyIcons["bcrypt"],
      technologyIcons["passport"],
      technologyIcons["JSON Web Token (JWT)"],
    ],
  },
];

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | Jainish Patel</title>
      </Head>

      <main className="min-h-screen text-white px-2 md:px-6 py-16">
        {/* Introduction */}
        <section className="max-w-5xl mx-auto mb-20 backdrop-blur-md bg-black/30 p-8 rounded-xl shadow-lg">
          <h2 className="font-orbitron text-3xl font-bold mb-6 text-center">
            About Me
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/personal/Jainish-face.jpg"
              alt="Jainish Patel"
              className="w-40 h-40 rounded-full object-cover border-4 border-purple-500 shadow-xl"
            />

            <div className="text-gray-300 text-lg space-y-4 text-justify">
              <p>
                I’m <strong>Jainish Patel</strong>, a third-year B.Tech student
                in Information Technology at GCET with a deep passion for
                full-stack development and intelligent systems. With a strong
                CGPA of <strong>9.49/10</strong> and over{" "}
                <strong>600+ solved DSA problems</strong>, I thrive at the
                intersection of scalable engineering and problem-solving.
              </p>

              <p>
                My expertise lies in building production-ready platforms using
                technologies like{" "}
                <strong>React.js, Next.js, Express.js, PostgreSQL</strong>, and{" "}
                <strong>Tailwind CSS</strong>. I’ve architected solutions for
                real-world use cases, including a national-winning hackathon
                project — <strong>ZenSkills</strong> — a mentoring platform that
                leverages real-time chat, WebRTC, and custom matching logic to
                connect mentees and mentors.
              </p>

              <p>
                I also explore the frontier of AI/ML through projects like my{" "}
                <strong>IELTS Evaluator</strong> web app, which analyzes essays
                using <strong>OpenAI and HuggingFace</strong> APIs with
                voice/text input support. My development workflow is backed by
                strong version control, API design, and a commitment to clean
                architecture.
              </p>

              <p>
                Beyond coding, I enjoy competitive programming, open-source
                collaboration, and pushing the limits of what can be built on
                the web. Let’s innovate, iterate, and launch impactful tech
                together.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="max-w-5xl mx-auto mb-20 backdrop-blur-md bg-black/30 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🏆 Achievements</h2>
          <ul className="space-y-4 list-disc list-inside text-gray-300">
            {achievements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Skills Section with Logos */}
        <section className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-6">🛠️ Skills</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {techCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-black/30 px-10 p-4 rounded-xl shadow-md backdrop-blur"
              >
                <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((tech) => {
                    // const tech = technologyIcons[index];
                    if (!tech) return null; // Skip if tech is not defined
                    return (
                      <li
                        key={tech.name}
                        className="flex items-center gap-3 text-white"
                      >
                        <span className="text-gray-300">{tech?.name}</span>
                        {tech && tech.imageUrl && tech.imageUrl !== "" && (
                          <img
                            key={tech.name}
                            src={tech.imageUrl}
                            alt={tech.name}
                            className="w-4 h-4 filter brightness-0 invert"
                            // Optional: tailwind bg tint hack (use white icons only)
                            style={{
                              filter:
                                "invert(63%) sepia(89%) saturate(3886%) hue-rotate(246deg) brightness(95%) contrast(101%)",
                            }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-5xl mx-auto mb-20 backdrop-blur-md bg-black/30 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">📅 My Journey</h2>
          <div className="border-l-2 border-purple-500 ml-4 space-y-8">
            {[
              { year: "2019", event: "SSC (GSEB) - 95.16%" },
              { year: "2021", event: "HSC (GSEB) - 96.13%" },
              { year: "2022", event: "Started B.Tech at GCET (IT)" },
              {
                year: "2023",
                event: "Built A* Visualizer & Huffman Compression Tool",
              },
              {
                year: "2024",
                event: "Won Smart India Hackathon (ZenSkills Platform)",
              },
              { year: "2024", event: "Built IELTS AI Evaluator Web App" },
              { year: "2024", event: "Achieved 9.49 CGPA after 5 semesters" },
              { year: "2025", event: "Solved 600+ DSA problems" },
              { year: "2025", event: "Launched this Portfolio Website" },
            ].map((item, idx) => (
              <div key={idx} className="ml-4">
                <div className="text-purple-400 font-semibold">{item.year}</div>
                <div className="text-gray-300">{item.event}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
