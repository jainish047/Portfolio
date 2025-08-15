import { languages, tags } from "@/data/tags";
import { technologyIcons as ti, techologyType } from "@/data/tags";

export type ProjectType = {
  title: string;
  description: string;
  fullDescription: string;
  language: string;
  majorTechnologies: techologyType[];
  otherTechnologies: techologyType[];
  imageUrl: string;
  moreImageUrls: string[];
  githubUrl: string;
  liveUrl: string;
  specialTags: string[];
  hiddenTags: string[];
  tags: string[];
  features: string[];
};

const projectList: ProjectType[] = [
  {
    title: "ZenSkills : Mentorship Platform",
    description: "A platform connecting mentors with mentees.",
    fullDescription:
      "ZenSkills is a Smart India Hackathon 2024 winning platform designed to bridge the gap between students and professionals. It enables mentees to connect with industry mentors for one-on-one sessions, discussions, and career guidance. The system includes role-based access control, real-time messaging using WebSockets, video call integration via VideoSDK, and calendar-based session booking. Built with a React.js frontend and a secure backend using Express.js and PostgreSQL, the platform also includes admin tools and notification systems to manage users effectively.",

    language: languages.javascript,
    majorTechnologies: [
      ti.Reactjs,
      ti.Nodejs,
      ti["Express.js"],
      ti.PostgreSQL,
      ti.VideoSDK,
      ti.Bootstrap,
    ],
    otherTechnologies: [
      ti.Prisma,
      ti.Axios,
      ti.Formik,
      ti.Yup,
      ti.ReactRouter,
      ti.ReduxToolkit,
      ti.Bootstrap,
      ti.PostCSS,
      ti.StyledComponents,
      ti.FramerMotion,
      ti.Chartjs,
      ti["Prisma ORM"],
      ti.bcrypt,
      ti.passport,
      ti["JSON Web Token (JWT)"],
      ti.Nodemailer,
      ti.bcryptjs,
      ti.multer,
      ti.cors,
      ti["express-session"],
      ti["express-validator"],
    ],
    imageUrl: "/images/Zenskills/1.png",
    moreImageUrls: Array.from({ length: 10 }, (_, i) => `/images/Zenskills/${i+1}.png`) || [],
    githubUrl: "https://github.com/jainish047/MentorshipPlatform-ZenSkills.git",
    liveUrl: "",
    specialTags: [tags.SIH2024Winner],
    hiddenTags: [tags.SIH2024Problem, tags.hackathonProject],
    tags: [tags.webDevelopment],
    features: [
      "Role-based access control",
      "Mentor and Mentee profiles",
      "Real-time chat",
      "Video chat integration with VideoSDK",
      "Scheduling and calendar integration",
      "Search and filter mentors by skills and availability",
      "Authentication and Authorization",
      "Postgres + Prisma integration",
      "Responsive design with Bootstrap",
      "Admin dashboard for managing users and content",
      "Email notifications using Nodemailer",
    ],
  },
  {
    title: "Freelancing Platform",
    description: "A platform connecting freelancers with clients.",
    fullDescription:
      "This freelancing platform empowers clients to post job listings and freelancers to place bids, communicate in real-time, and collaborate efficiently with milestone tracking and payment workflows. Developed using React.js, Node.js, Express, and PostgreSQL, the system supports role-based dashboards, secure authentication using JWT, and blockchain-inspired immutable logs for transaction history. Tailwind CSS ensures responsive UI, while Cashfree integration handles payments. Real-time collaboration is powered by WebSockets.",

    language: languages.javascript,
    majorTechnologies: [
      ti.Reactjs,
      ti.Nodejs,
      ti["Express.js"],
      ti.PostgreSQL,
      ti.VideoSDK,
      ti.TailwindCSS,
    ],
    otherTechnologies: [
      ti["Socket.IO"],
      ti.Prisma,
      ti.Axios,
      ti.Formik,
      ti.Yup,
      ti.ReactRouter,
      ti.ReduxToolkit,
      ti.Bootstrap,
      ti.TailwindCSS,
      ti.PostCSS,
      ti.StyledComponents,
      ti.FramerMotion,
      ti.Chartjs,
      ti["Prisma ORM"],
      ti.bcrypt,
      ti.passport,
      ti["JSON Web Token (JWT)"],
      ti.Nodemailer,
      ti.bcryptjs,
      ti.multer,
      ti.cors,
      ti["express-session"],
      ti["express-validator"],
    ],
    imageUrl: "/images/freelancer/1.png",
    moreImageUrls: ["/images/freelancer/6.png", "/images/freelancer/3.png", "/images/freelancer/11.png", "/images/freelancer/14.png", "/images/freelancer/2.png"],
    githubUrl: "https://github.com/jainish047/Freelancing-Platform.git",
    liveUrl: "",
    specialTags: [tags.SIH2024Problem],
    hiddenTags: [tags.SIH2024Problem],
    tags: [tags.webDevelopment, tags.blockchain],
    features: [
      "Job posting and bidding system",
      "Freelancer and client profiles",
      "Milestone tracking and payment integration",
      "Real-time messaging",
      "Authentication using JWT",
      "Role-based dashboards for freelancers and clients",
      "Secure backend with PostgreSQL",
      "Blockchain-based transaction history",
      "Responsive design with Tailwind CSS",
      "Cashfree payment gateway integration",
    ],
  },
  {
    title: "Text File Zipper : Huffman Compression",
    description: "A tool for compressing text files using Huffman coding.",
    fullDescription:
      "This is a C++ command-line utility for compressing and decompressing text files using Huffman Coding. It builds a custom Huffman Tree based on character frequency to achieve efficient compression and supports both encoding and decoding functionalities. The project focuses on memory-efficient data handling, optimal bit manipulation, and showcases real-world usage of data structures like priority queues and trees for file compression in CLI environments.",

    language: languages.cplusplus,
    majorTechnologies: [ti["Huffman Coding"], ti["bits/stdc++.h"]],
    otherTechnologies: [ti.Algorithms],
    imageUrl: "/images/huffman/1.png",
    moreImageUrls: ["/images/huffman/1.png", "/images/huffman/2.png", "/images/huffman/3.png", "/images/huffman/4.png"],
    githubUrl: "https://github.com/jainish047/Textfile-Zipper.git",
    liveUrl: "",
    specialTags: [],
    hiddenTags: [],
    tags: [tags.dsa],
    features: [
      "Custom Huffman Tree generation",
      "Compression ratio display",
      "Encoding and Decoding of text files",
      "CLI-based user interface",
    ],
  },
  {
    title: "Note Taker : Notes Management System",
    description: "A tool for managing and organizing notes.",
    fullDescription:
      "Note Taker is a full-stack web application developed using Next.js, TypeScript, and MongoDB for managing and organizing personal notes. It supports voice-based note creation with transcription powered by AssemblyAI, image uploads via Cloudinary, and JWT-based user authentication. The application provides a responsive UI using Tailwind CSS, with secure handling of files using multer and formidable. It is structured around modular backend routes and Mongoose-based schema validation.",

    language: languages.typescript,
    majorTechnologies: [
      ti.TypeScript,
      ti.Nextjs,
      ti.Reactjs,
      ti.MongoDB,
      ti["Express.js"],
    ],
    otherTechnologies: [
      ti.Mongoose,
      ti.Cloudinary,
      ti.bcrypt,
      ti["JSON Web Token (JWT)"],
      ti.multer,
      ti.formidable,
      ti.TailwindCSS,
    ],
    imageUrl: "",
    moreImageUrls: [],
    githubUrl: "https://github.com/jainish047/TARS-Assignment.git",
    liveUrl: "",
    specialTags: [],
    hiddenTags: [],
    tags: [tags.dsa, tags.webDevelopment],
    features: [
      "Voice-to-text note capture",
      "Voice transcription generation using AssemblyAI",
      "JWT authentication",
      "Multiple image upload via Cloudinary",
      "Responsive Tailwind UI",
      "MongoDB with Mongoose schema modeling",
      "Secure backend file handling",
    ],
  },
  {
    title: "ZenDotslash: AI/NLP IELTS Evaluator",
    description: "Web app to analyze IELTS essays using NLP APIs...",
    fullDescription:
      "ZenDotslash is an AI-powered web application that evaluates IELTS Writing Task 2 essays using state-of-the-art NLP models from Grok and HuggingFace. It offers instant scoring with <5s latency and features voice-to-text input support via the Web Speech API. Built using Next.js and Tailwind CSS, it leverages Firebase for authentication and Firestore for persistent storage. The evaluation logic considers grammar, coherence, lexical resource, and task response — enabling students to iteratively improve their writing.",
    language: languages.typescript,
    majorTechnologies: [
      ti.Nextjs,
      ti.Firebase,
      ti.TailwindCSS,
      ti["HuggingFace API"],
      ti["Grok NLP"],
    ],
    otherTechnologies: [
      ti.OpenAI,
      ti["Speech Recognition API"],
      ti.FramerMotion,
      ti["React Hook Form"],
      ti.Firebase,
      ti["Firebase Firestore"],
      ti["Firebase Auth"],
    ],
    imageUrl: "/images/Prephelp/1.png",
    moreImageUrls: Array.from({ length: 10 }, (_, i) => `/images/Zenskills/${i}.png`) || [],
    githubUrl: "https://github.com/techstavan/Zen-Dotslash8.git",
    liveUrl: "",
    specialTags: [tags.hackathonProject],
    hiddenTags: [],
    tags: [tags.ai, tags.webDevelopment, tags.nlp],
    features: [
      "NLP-based IELTS essay analysis",
      "Integrated Grok and HuggingFace APIs",
      "Text and voice input modes",
      "Instant scoring with <5s latency",
      "85%+ evaluation accuracy",
      "10,000+ word contextual vocabulary",
    ],
  },
  {
    title: "Puzzle Solver : 8-Puzzle Solver",
    description: "A tool for solving the 8-puzzle problem using A* search.",
    fullDescription:
      "Puzzle Solver is a visual educational tool that demonstrates how the A* search algorithm can solve the classic 8-puzzle problem. The React.js-based frontend offers an animated step-by-step walkthrough of tile movements using Manhattan distance heuristics. Users can input custom puzzle states and visually understand the heuristic-driven search process. The project highlights key concepts like admissible heuristics, open/closed lists, and priority queue operations.",

    language: languages.javascript,
    majorTechnologies: [ti["A* Search Algorithm"], ti.Reactjs],
    otherTechnologies: [ti.Algorithms],
    imageUrl: "/images/8puzzle/1.png",
    moreImageUrls: ["/images/8puzzle/1.png"],
    githubUrl: "https://github.com/jainish047/Puzzle-Solver.git",
    liveUrl: "",
    specialTags: [],
    tags: [tags.dsa, tags.webDevelopment],
    hiddenTags: [],
    features: [
      "A* algorithm with heuristic cost calculation",
      "Puzzle state visualizer",
      "Step-by-step animation",
      "Custom puzzle input",
      "React-based frontend architecture",
    ],
  },
  {
    title: "Chess : Command Line",
    description: "A command line tool for playing chess.",
    fullDescription:
      "This project implements a complete chess game in C++ using object-oriented programming principles. It supports all major rules of chess including en passant, castling, pawn promotion, and checkmate detection. The CLI-based UI displays the board state and takes user commands for piece movement, enforcing legality checks through modular logic. It is a great showcase of data structure design, algorithmic thinking, and encapsulated game logic in a low-level environment.",
    language: languages.cplusplus,
    majorTechnologies: [ti["bits/stdc++.h"], ti.Algorithms],
    otherTechnologies: [],
    imageUrl: "/images/chess/1.png",
    moreImageUrls: ["/images/chess/1.png", "/images/chess/2.png", "/images/chess/3.png"],
    githubUrl: "https://github.com/jainish047/Chess-Command-prompt-.git",
    liveUrl: "",
    specialTags: [],
    hiddenTags: [],
    tags: [tags.dsa],
    features: [
      "Full chess rule implementation",
      "Command-line board interface",
      "Move validation and piece logic",
      "Pawn promotion and castling",
      "C++ OOP-based structure",
    ],
  },
];

export default projectList;
