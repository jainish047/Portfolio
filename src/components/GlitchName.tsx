'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

interface GlitchNameProps {
  text: string;
  /** ms before scan starts, default 100 */
  startDelay?: number;
  className?: string;
}

export default function GlitchName({
  text,
  startDelay = 100,
  className = '',
}: GlitchNameProps) {
  // Each char has a state: 'hidden' | 'scrambling' | 'resolved'
  const [chars, setChars] = useState<string[]>(() => text.split('').map(() => '·'));
  const [resolved, setResolved] = useState<boolean[]>(() => text.split('').map(() => false));
  const [glitching, setGlitching] = useState(false);
  const [done, setDone] = useState(false);
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const letters = text.split('');
    const totalLetters = letters.length;

    // Per-character scramble state
    const scrambleIntervals: ReturnType<typeof setInterval>[] = [];
    const resolveTimeouts: ReturnType<typeof setTimeout>[] = [];

    const start = setTimeout(() => {
      letters.forEach((letter, i) => {
        // Stagger when each letter starts being scanned
        const scanDelay = i * 65; // beam advances 65ms per char

        // Start scrambling this char
        const scrambleStart = setTimeout(() => {
          const scramble = setInterval(() => {
            setChars((prev) => {
              const next = [...prev];
              next[i] = letter === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
              return next;
            });
          }, 50);
          scrambleIntervals[i] = scramble;

          // Resolve after ~300ms of scramble per char
          const resolveDelay = setTimeout(() => {
            clearInterval(scrambleIntervals[i]);
            setChars((prev) => {
              const next = [...prev];
              next[i] = letter;
              return next;
            });
            setResolved((prev) => {
              const next = [...prev];
              next[i] = true;
              // Check if last char
              if (i === totalLetters - 1) setDone(true);
              return next;
            });
          }, 300);
          resolveTimeouts[i] = resolveDelay;
        }, scanDelay);

        resolveTimeouts.push(scrambleStart as unknown as ReturnType<typeof setTimeout>);
      });
    }, startDelay);

    return () => {
      clearTimeout(start);
      scrambleIntervals.forEach(clearInterval);
      resolveTimeouts.forEach(clearTimeout);
    };
  }, [text, startDelay]);

  // Hover glitch
  function triggerGlitch() {
    if (!done) return;
    setGlitching(true);
    if (glitchTimer.current) clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitching(false), 400);
  }

  let charGlobalIndex = 0;
  const words = text.split(' ');

  return (
    <span
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={triggerGlitch}
      aria-label={text}
    >
      {words.map((word, wIdx) => {
        const wordStartIndex = charGlobalIndex;
        charGlobalIndex += word.length + 1;

        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((letter, lIdx) => {
              const i = wordStartIndex + lIdx;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block relative"
                  style={{
                    textShadow: resolved[i]
                      ? done
                        ? undefined
                        : '0 0 8px rgba(167,139,250,0.8)'
                      : 'none',
                    color: resolved[i] ? 'inherit' : 'rgba(167,139,250,0.5)',
                    transition: 'color 0.15s',
                    ...(glitching && resolved[i]
                      ? {
                          animation: `glitch-char ${0.08 + Math.random() * 0.12}s steps(1) infinite`,
                          filter: `hue-rotate(${Math.random() * 60 - 30}deg)`,
                        }
                      : {}),
                  }}
                >
                  {chars[i] || '·'}
                </span>
              );
            })}
            {wIdx < words.length - 1 && (
              <span aria-hidden="true" className="inline-block relative">
                {'\u00A0'}
              </span>
            )}
          </span>
        );
      })}

      {/* Inline style for pulse glow once done */}
      {done && (
        <style>{`
          .glitch-name-done {
            animation: name-glow-pulse 3s ease-in-out infinite;
          }
          @keyframes name-glow-pulse {
            0%, 100% { text-shadow: 0 0 10px rgba(139,92,246,0.4), 0 0 30px rgba(139,92,246,0.15); }
            50%       { text-shadow: 0 0 20px rgba(167,139,250,0.7), 0 0 50px rgba(139,92,246,0.3); }
          }
          @keyframes glitch-char {
            0%   { transform: translate(0,0);         }
            25%  { transform: translate(-2px, 1px);   }
            50%  { transform: translate(2px, -1px);   }
            75%  { transform: translate(-1px, 2px);   }
            100% { transform: translate(0,0);         }
          }
        `}</style>
      )}
    </span>
  );
}
