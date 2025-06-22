"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SatelliteDish, Earth, Rocket, Brain, SignalHigh, FileCode2 } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Command Center", icon: Earth, href: "/" },
  { name: "Missions", icon: Rocket, href: "/projects" },
  { name: "Logs", icon: Brain, href: "/about" },
  { name: "Transmission", icon: SatelliteDish, href: "/contact" },
  { name: "Data Core", icon: FileCode2, href: "/resume" }, // Optional
];

interface Props {
  onClose: () => void;
}

export const VerticalMenuBar: React.FC<Props> = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  // Wait for exit animation to finish, then call parent onClose
  const handleAnimationComplete = () => {
    if (!visible) {
      onClose();
    }
  };

  //Earth
  //rocket
  //satellite-dish

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onAnimationComplete={handleAnimationComplete}
      className="flex flex-col justify-around items-center text-white p-4 shadow-lg w-full"
    >
      {/* <ul className="flex flex-col justify-around items-center">
        <li className="text-center hover:underline cursor-pointer">About</li>
        <li className="text-center hover:underline cursor-pointer">Projects</li>
        <li className="text-center hover:underline cursor-pointer">Contact</li>
        <li className="text-center hover:underline cursor-pointer">Resume</li>
      </ul> */}

      <div className="flex flex-col justify-around items-center gap-6">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className="text-center text-sm md:text-base text-white hover:text-cyan-400 hover:drop-shadow-[0_0_6px_cyan] flex flex-col items-center gap-2 font-bold font-rajdhani uppercase tracking-wide transition-all"
            >
              <Icon size={18} />
              {name}
            </Link>
          ))}
        </div>
    </motion.div>
  );
};
