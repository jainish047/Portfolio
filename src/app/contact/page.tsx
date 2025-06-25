import React from "react";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Jainish Patel</title>
      </Head>

      <main className="min-h-screen text-white px-6 py-16">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">📬 Let&apos;s Connect</h1>
          <p className="text-lg text-gray-300 mb-10">
            Whether it&apos;s collaboration, freelance opportunities, or tech talk —
            I&apos;m always open to meaningful conversations. Reach out via:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 sm:flex-row justify-center gap-6 text-lg mb-4">
            <a
              href="https://github.com/jainish047"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-purple-800 bg-purple-700/30 hover:bg-purple-800 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              🔗 GitHub
            </a>
            <a
              href="https://linkedin.com/in/jainish-patel-7a8b8825a"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-800 bg-blue-600/30 hover:bg-blue-700 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              💼 LinkedIn
            </a>
            <a
              href="mailto:jainish.patel047@gmail.com"
              className="border border-green-800 bg-green-600/30 hover:bg-green-700 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              📧 Email
            </a>
            <a
              href="https://leetcode.com/jainish47"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-orange-800 bg-orange-600/30 hover:bg-orange-700 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              🧩 LeetCode
            </a>
            <a
              href="https://codeforces.com/profile/JD47"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-red-800 bg-red-600/30 hover:bg-red-700 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              ⚔️ Codeforces
            </a>
            <a
              href="https://www.codechef.com/users/jainish_47"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-800 bg-gray-800/30 hover:bg-gray-900 px-6 py-3 rounded-full shadow text-white transition font-bold col-span-1"
            >
              🍽️ CodeChef
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
