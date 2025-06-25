import React from "react";
import Head from "next/head";

const ResumePage = () => {
  return (
    <>
      <Head>
        <title>Resume | Jainish Patel</title>
      </Head>

      <div className="min-h-screen text-white px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between justify-center items-center mb-8">
            <h1 className="text-3xl font-bold text-center">
            Jainish Patel : My Resume
          </h1>

          <div className="flex justify-center">
            <a
              href="/personal/Jainish_Patel_Resume.pdf"
              download
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              ⬇️ Download Resume
            </a>
          </div>
          </div>

          <div className="w-full h-[80vh]">
            <iframe
              src="/personal/Jainish_Patel_Resume.pdf"
              className="w-full h-full rounded-lg border border-white shadow-md"
              title="Resume Preview"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePage;
