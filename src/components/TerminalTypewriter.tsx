'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalTypewriterProps {
  text: string;
  /** ms per character, default 45 */
  speed?: number;
  /** delay before typing starts (ms), default 600 */
  startDelay?: number;
  /** hide the cursor once typing is finished */
  hideCursorWhenDone?: boolean;
  className?: string;
}

export default function TerminalTypewriter({
  text,
  speed = 45,
  startDelay = 600,
  hideCursorWhenDone = false,
  className = '',
}: TerminalTypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  // Typing effect
  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
          return;
        }
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  // Cursor blink — fast while typing, slow after done
  useEffect(() => {
    const blinkSpeed = done ? 530 : 300;
    const blink = setInterval(() => setCursorVisible((v) => !v), blinkSpeed);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span className={`inline-block ${className}`}>
      {/* scanline shimmer on the text itself */}
      <span
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {displayed}
      </span>
      {/* blinking underscore cursor */}
      <span
        aria-hidden="true"
        style={{
          opacity: (hideCursorWhenDone && done) ? 0 : cursorVisible ? 1 : 0,
          transition: 'opacity 0.08s',
        }}
        className="ml-[1px] text-white"
      >
        _
      </span>
    </span>
  );
}
