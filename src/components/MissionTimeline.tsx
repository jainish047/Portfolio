'use client';

import Link from 'next/link';
import { motion, easeInOut } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
}

interface Props {
  milestones: Milestone[];
}

export default function MissionTimeline({ milestones }: Props) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-center md:justify-between items-center mb-10 px-2">
        <h2 className="text-2xl md:text-3xl font-semibold">My Journey</h2>
        <Link
          href="/about#timeline"
          className="hidden md:block text-sm font-semibold text-blue-400 underline hover:text-blue-300"
        >
          View Full Timeline →
        </Link>
      </div>

      {/* ── Desktop: horizontal rail ── */}
      <div className="hidden md:block relative px-8 py-6">
        {/* Glowing rail */}
        <div
          className="absolute left-8 right-8 rounded-full"
          style={{
            top: '50%',
            height: 2,
            background:
              'linear-gradient(to right, rgba(139,92,246,0.1), rgba(139,92,246,0.85) 20%, rgba(96,165,250,0.85) 80%, rgba(96,165,250,0.1))',
            boxShadow: '0 0 8px 2px rgba(139,92,246,0.4), 0 0 20px 4px rgba(96,165,250,0.2)',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Milestones */}
        <div className="relative flex justify-around items-center" style={{ minHeight: 160 }}>
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.18, ease: easeInOut }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              {/* Year – above rail */}
              <p
                className="font-orbitron text-xl font-bold mb-4"
                style={{ textShadow: '0 0 12px rgba(167,139,250,0.7)' }}
              >
                {m.year}
              </p>

              {/* Star dot on rail */}
              <div className="relative mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, #c4b5fd 0%, #7c3aed 60%, transparent 100%)',
                    boxShadow: '0 0 10px 3px rgba(139,92,246,0.8)',
                  }}
                />
                {/* Ping ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(139,92,246,0.35)',
                    animation: `star-ping 2.4s ease-out ${i * 0.5}s infinite`,
                  }}
                />
              </div>

              {/* Description – below rail */}
              <p className="text-gray-300 text-sm text-center max-w-[130px] leading-snug">
                {m.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical filament in centered glass container ── */}
      <div className="md:hidden mx-auto max-w-md p-6 backdrop-blur-md border border-blue-500/30 bg-black/40 rounded-xl relative shadow-lg">
        {/* Filament */}
        <div
          className="absolute left-8 top-8 bottom-8 w-0.5 rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(139,92,246,0.9), rgba(96,165,250,0.6))',
            animation: 'filament-pulse 3s ease-in-out infinite',
          }}
        />
        <div className="pl-7 space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: easeInOut }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Star dot */}
              <div className="absolute -left-[27px] top-1">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, #c4b5fd 0%, #7c3aed 60%, transparent 100%)',
                    boxShadow: '0 0 8px 2px rgba(139,92,246,0.7)',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(139,92,246,0.4)',
                    animation: `star-ping 2s ease-out ${i * 0.4}s infinite`,
                  }}
                />
              </div>
              <p
                className="text-lg font-bold font-orbitron text-purple-300"
                style={{ textShadow: '0 0 10px rgba(167,139,250,0.6)' }}
              >
                {m.year}
              </p>
              <p className="text-gray-200 text-sm mt-1 leading-relaxed">{m.title}</p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/about#timeline"
          className="block text-center mt-6 text-sm font-semibold text-blue-400 underline hover:text-blue-300"
        >
          View Full Timeline →
        </Link>
      </div>
    </div>
  );
}
