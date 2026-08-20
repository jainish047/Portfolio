'use client';

import { useEffect, useState, CSSProperties } from 'react';

/* ─── Planet palette – inspired by real solar system bodies ─── */
const PLANET_PALETTE = [
  {
    size: 20,
    gradient: 'radial-gradient(circle at 36% 30%, #e5e7eb 0%, #9ca3af 45%, #4b5563 100%)',
    glow: 'rgba(156,163,175,0.75)',
  },
  {
    size: 26,
    gradient: 'radial-gradient(circle at 36% 30%, #fefce8 0%, #eab308 40%, #92400e 100%)',
    glow: 'rgba(234,179,8,0.8)',
  },
  {
    size: 28,
    gradient: 'radial-gradient(circle at 36% 28%, #dbeafe 0%, #2563eb 40%, #1e3a8a 100%)',
    glow: 'rgba(37,99,235,0.75)',
  },
  {
    size: 22,
    gradient: 'radial-gradient(circle at 38% 30%, #fecaca 0%, #dc2626 42%, #7f1d1d 100%)',
    glow: 'rgba(220,38,38,0.8)',
  },
  {
    size: 36,
    gradient:
      'repeating-linear-gradient(170deg, #fed7aa 0px, #f97316 8px, #92400e 16px, #fed7aa 24px)',
    glow: 'rgba(249,115,22,0.75)',
    extraStyle: { borderRadius: '50%', overflow: 'hidden' } as CSSProperties,
  },
  {
    size: 24,
    gradient: 'radial-gradient(circle at 36% 30%, #bfdbfe 0%, #1d4ed8 45%, #1e3a8a 100%)',
    glow: 'rgba(29,78,216,0.75)',
  },
];

/* ─── Star palette ─── */
const STAR_PALETTE = [
  {
    gradient: 'radial-gradient(circle at 38% 32%, #fffbeb 0%, #fbbf24 35%, #d97706 65%, #92400e 100%)',
    glow: 'rgba(251,191,36,0.9)',
    corona: 'rgba(253,224,71,0.25)',
  },
  {
    gradient: 'radial-gradient(circle at 38% 32%, #f0f9ff 0%, #7dd3fc 35%, #0284c7 65%, #075985 100%)',
    glow: 'rgba(125,211,252,0.9)',
    corona: 'rgba(186,230,253,0.2)',
  },
  {
    gradient: 'radial-gradient(circle at 38% 32%, #ffe4e6 0%, #f87171 35%, #b91c1c 65%, #7f1d1d 100%)',
    glow: 'rgba(248,113,113,0.9)',
    corona: 'rgba(252,165,165,0.2)',
  },
];

/* Radii sets – desktop vs mobile compact (~65%) */
const ORBITAL_RADII         = [68, 92, 116, 142, 168, 196];
const ORBITAL_RADII_COMPACT = [48, 64,  80,  98, 116, 134];

interface SystemDef {
  label: string;
  icon: string;
  skills: string[];
  starIndex: number;
}

interface Props {
  systems: SystemDef[];
}

export default function SolarSystemSection({ systems }: Props) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const check = () => setCompact(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-orbitron font-semibold text-center mb-2 text-white/90">
        My Core Tech Pillars
      </h2>
      <p className="text-center text-gray-400 text-sm mb-8">
        Three solar systems, each orbiting a different discipline
      </p>

      {/* Stack on mobile, side by side on desktop */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        {systems.map((sys, si) => (
          <System key={sys.label} sys={sys} si={si} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function System({ sys, compact }: { sys: SystemDef; si: number; compact: boolean }) {
  const star       = STAR_PALETTE[sys.starIndex % STAR_PALETTE.length];
  const radii      = compact ? ORBITAL_RADII_COMPACT : ORBITAL_RADII;
  const numSkills  = sys.skills.length;
  const maxRadius  = radii[numSkills - 1];
  const padding    = compact ? 28 : 40;
  const containerSize = (maxRadius + padding) * 2;
  const center     = containerSize / 2;
  const starSize   = compact ? 40 : 56;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: containerSize, height: containerSize }}>

        {/* Orbit rings */}
        {sys.skills.map((_, i) => {
          const r = radii[i];
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                left: center - r,
                top: center - r,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            />
          );
        })}

        {/* Central star */}
        <div
          className="absolute rounded-full"
          style={{
            width: starSize,
            height: starSize,
            left: center - starSize / 2,
            top: center - starSize / 2,
            background: star.gradient,
            boxShadow: `0 0 16px 6px ${star.glow}, 0 0 40px 16px ${star.corona}`,
            animation: 'star-pulse 4s ease-in-out infinite',
            zIndex: 10,
          }}
        />

        {/* Star label */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: center,
            top: center + starSize / 2 + 6,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: compact ? 14 : 18 }}>{sys.icon}</span>
          <span
            className="font-orbitron font-bold text-white/70 mt-0.5 whitespace-nowrap"
            style={{ fontSize: compact ? 9 : 11 }}
          >
            {sys.label}
          </span>
        </div>

        {/* Planets */}
        {sys.skills.map((skill, i) => {
          const r         = radii[i];
          const planet    = PLANET_PALETTE[i % PLANET_PALETTE.length];
          const pSize     = compact ? Math.round(planet.size * 0.72) : planet.size;
          const duration  = 12 + i * 4;
          const startFrac = i / numSkills;
          const delay     = `-${(startFrac * duration).toFixed(2)}s`;

          return (
            /* Rotating orbit carrier */
            <div
              key={skill}
              className="absolute rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                left: center - r,
                top: center - r,
                animation: `orbit-spin ${duration}s linear ${delay} infinite`,
              }}
            >
              {/* Counter-spinning planet + label */}
              <div
                style={{
                  position: 'absolute',
                  top: -(pSize / 2),
                  left: '50%',
                  animation: `orbit-counter ${duration}s linear ${delay} infinite`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: compact ? 2 : 4,
                  zIndex: 5,
                }}
              >
                {/* Planet sphere */}
                <div
                  style={{
                    width: pSize,
                    height: pSize,
                    borderRadius: '50%',
                    background: planet.gradient,
                    boxShadow: `0 0 ${compact ? 5 : 8}px ${compact ? 2 : 3}px ${planet.glow}`,
                    overflow: 'hidden',
                    flexShrink: 0,
                    ...(planet.extraStyle ?? {}),
                  }}
                />
                {/* Skill label */}
                <span
                  className="font-semibold text-gray-200 whitespace-nowrap select-none"
                  style={{
                    fontSize: compact ? 8 : 10,
                    transform: 'translateX(-50%)',
                    marginLeft: '50%',
                    textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  }}
                >
                  {skill}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
