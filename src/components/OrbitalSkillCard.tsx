'use client';

import { useEffect, useRef } from 'react';

interface OrbitalSkillCardProps {
  icon: string;
  label: string;
  skills: string[];
  /** tailwind ring colour class e.g. 'border-purple-500' */
  ringColor: string;
  /** tailwind glow shadow for skills e.g. 'rgba(168,85,247,0.6)' */
  glowColor: string;
}

export default function OrbitalSkillCard({
  icon,
  label,
  skills,
  ringColor,
  glowColor,
}: OrbitalSkillCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center">
      {/* ── DESKTOP: orbital system ── */}
      <div
        ref={containerRef}
        className="relative hidden md:flex items-center justify-center"
        style={{ width: 260, height: 260 }}
        aria-label={label}
      >
        {/* Orbit ring */}
        <div
          className={`absolute rounded-full border ${ringColor} opacity-20`}
          style={{ width: 220, height: 220 }}
        />
        {/* Faint inner ring */}
        <div
          className={`absolute rounded-full border ${ringColor} opacity-10`}
          style={{ width: 150, height: 150 }}
        />

        {/* Centre node */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 ${ringColor} bg-black/60 backdrop-blur-sm`}
          style={{ boxShadow: `0 0 18px 3px ${glowColor}30` }}
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-[9px] font-orbitron font-bold text-center leading-tight px-1 mt-1 opacity-80">
            {label.toUpperCase()}
          </span>
        </div>

        {/* Orbiting skill tags */}
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * 360;
          const radius = 110; // px from centre
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          // Each tag orbits continuously; offset animation-delay to stagger
          const duration = 18 + i * 1.5; // different speeds = organic feel
          const delay = -(i * (duration / skills.length)); // pre-offset so they start spread

          return (
            <div
              key={skill}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                // place tag at orbit position
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: `orbit-tag ${duration}s linear ${delay}s infinite`,
                transformOrigin: `${-x}px ${-y}px`,
              }}
            >
              <span
                className="whitespace-nowrap text-xs font-semibold px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: glowColor,
                  color: '#e2e8f0',
                  background: `${glowColor}18`,
                  boxShadow: `0 0 8px 1px ${glowColor}40`,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {skill}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE: flat pill grid ── */}
      <div className="md:hidden w-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-bold font-orbitron">{label}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                borderColor: glowColor,
                color: '#e2e8f0',
                background: `${glowColor}18`,
                boxShadow: `0 0 6px 1px ${glowColor}30`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
