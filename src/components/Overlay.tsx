// components/Overlay.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  visible: boolean;
  onClick: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ visible, onClick }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={onClick}
          className="fixed inset-0 z-10 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
};
