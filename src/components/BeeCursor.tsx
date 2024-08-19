"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function BeeCursor() {
  useEffect(() => {
    const bee = document.getElementById("bee");

    const handleMouseMove = (e: MouseEvent) => {
      if (bee) {
        const x = e.clientX;
        const y = e.clientY;
        bee.style.left = `${x}px`;
        bee.style.top = `${y}px`;
        bee.classList.remove("hidden");
      }
    };

    const handleMouseLeave = () => {
      if (bee) {
        bee.classList.add("hidden");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div id="bee" className="hidden fixed pointer-events-none z-50">
      <Image
        src="/images/bee.png"
        alt="Bee"
        width={50}
        height={50}
      />
    </div>
  );
}
