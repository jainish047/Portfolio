import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import SpaceBackground from "@/components/background";
import BlackHoleButton from "@/components/BlackHoleButton";
import { Orbitron, Rajdhani } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Jainish Patel - Portfolio",
  description: "This is my portfolio website showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
    // <html lang="en">
    <html
      lang="en"
      className={`font-rajdhani antialiased ${rajdhani.variable} ${orbitron.variable}`}
    >
      <body className="m-0 p-0 overflow-x-hidden">
        {/* 1) Nebula image */}
        <div className="fixed inset-0">
          <Image
            src="/7.png"
            alt="Nebula background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        {/* 2) Three.js canvas */}
        <SpaceBackground />
        <BlackHoleButton />

        {/* 3) Your scrolling content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
