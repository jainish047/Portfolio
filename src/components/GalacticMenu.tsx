"use client";

import { useEffect, useState } from "react";
import BlackHoleButton from "@/components/BlackHoleButton";
import { AnimatePresence } from "framer-motion";
import { VerticalMenuBar } from "@/components/VerticalMenuBar";
import { Overlay } from "@/components/Overlay";
import { usePathname } from "next/navigation";
import { useRef } from "react";

// interface BlackHoleSectionProps {
//   menuOpen: boolean;
//   setMenuOpen: (arg:boolean) => void;
// }

const GalacticMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Track previous pathname to detect route changes
  // This is necessary to close the menu when navigating to a new route
  // because Next.js does not unmount the component on route change
  // and the pathname does not change.
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMenuOpen(false); // close menu when route changes
      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <>
      {/* Overlay/backdrop – z-20 */}
      <Overlay visible={menuOpen} onClick={() => setMenuOpen(false)} />

      {/* Button + menu wrapper – z-30 (above overlay) */}
      <div className="pointer-events-auto fixed flex flex-col items-center justify-around right-2 w-20 md:w-30 lg:w-40 z-30">
        <BlackHoleButton
          active={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <AnimatePresence mode="wait">
          {menuOpen && (
            <VerticalMenuBar
              key="vertical-menu"
              onClose={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GalacticMenu;
