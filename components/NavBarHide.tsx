"use client";

import { useState, useEffect } from "react";

export default function NavBar({ children }: { children: React.ReactNode }) {
  // State for controlling navbar visibility and hover state
  const [showNav, setShowNav] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Effect to handle mouse movement near the top of the screen
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 100) {
        setShowNav(true);
      } else if (!isHovered) {
        setShowNav(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  // Effect to hide navbar after delay when it's not hovered
  useEffect(() => {
    let hideNavTimeout: NodeJS.Timeout;
    if (showNav && !isHovered) {
      hideNavTimeout = setTimeout(() => {
        setShowNav(false);
      }, 2000); // Delay for 2 seconds
    }

    return () => clearTimeout(hideNavTimeout);
  }, [showNav, isHovered]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}
