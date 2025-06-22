import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jainish Patel - Portfolio",
  description: "This is my portfolio website showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
