'use client';

import { useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

interface TerminalButtonProps {
  label: string;
  /** variant: 'primary' (green glow) | 'secondary' (neutral) */
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function TerminalButton({
  label,
  variant = 'primary',
  onClick,
}: TerminalButtonProps) {
  const [displayed, setDisplayed] = useState(`[ ${label} ]`);
  const [scanning, setScanning] = useState(false);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);
  const target = `[ ${label} ]`;

  function startScramble() {
    setScanning(true);
    iterRef.current = 0;
    const totalIter = target.length * 2; // how many frames to scramble

    function tick() {
      iterRef.current += 1;
      const progress = iterRef.current / totalIter;
      const resolvedCount = Math.floor(progress * target.length);

      setDisplayed(
        target
          .split('')
          .map((ch, i) =>
            i < resolvedCount
              ? ch
              : ch === ' '
              ? ' '
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join('')
      );

      if (iterRef.current < totalIter) {
        rafRef.current = setTimeout(tick, 40);
      } else {
        setDisplayed(target);
        setScanning(false);
      }
    }

    tick();
  }

  function stopScramble() {
    if (rafRef.current) clearTimeout(rafRef.current);
    setDisplayed(target);
    setScanning(false);
  }

  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className={[
        'relative font-mono text-xs sm:text-sm md:text-base font-bold tracking-widest px-4 sm:px-6 py-2.5 sm:py-3 whitespace-nowrap',
        'overflow-hidden transition-all duration-300 cursor-pointer select-none',
        'border-2 rounded-sm',
        isPrimary
          ? 'border-green-400/70 text-green-300 bg-green-900/20 hover:bg-green-900/40 hover:border-green-300 hover:text-green-100 hover:shadow-[0_0_18px_2px_rgba(74,222,128,0.35)]'
          : 'border-blue-400/50 text-blue-300 bg-blue-900/10 hover:bg-blue-900/30 hover:border-blue-300 hover:text-blue-100 hover:shadow-[0_0_18px_2px_rgba(96,165,250,0.25)]',
        scanning ? 'opacity-90' : '',
      ].join(' ')}
    >
      {/* scan sweep line */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 translate-x-[-100%]',
          isPrimary
            ? 'bg-gradient-to-r from-transparent via-green-400/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-blue-400/15 to-transparent',
          scanning ? 'animate-[scan_0.55s_ease-in-out_forwards]' : '',
        ].join(' ')}
      />
      {displayed}
    </button>
  );
}
