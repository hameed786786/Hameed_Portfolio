"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface FloatingProfileCardProps {
  coords: {
    hero:      { top: number, left: number, width: number, height: number };
    about:     { top: number, left: number, width: number, height: number };
    scrollEnd: number;
  };
  reduced: boolean;
}

export default function FloatingProfileCard({ coords, reduced }: FloatingProfileCardProps) {
  const [imageError, setImageError] = useState(false);
  const { scrollY } = useScroll();

  const { scrollEnd } = coords;
  const p0 = 0;
  const p1 = scrollEnd * 0.25;
  const p2 = scrollEnd * 0.50;
  const p3 = scrollEnd * 0.68;
  const p4 = scrollEnd * 0.90;
  const p5 = scrollEnd;

  const top    = useTransform(scrollY, [p0, p5], [coords.hero.top,    coords.about.top], { clamp: true });
  const left   = useTransform(scrollY, [p0, p5], [coords.hero.left,   coords.about.left], { clamp: true });
  const width  = useTransform(scrollY, [p0, p5], [coords.hero.width,  coords.about.width], { clamp: true });
  const height = useTransform(scrollY, [p0, p5], [coords.hero.height, coords.about.height], { clamp: true });

  const scaleRaw  = useTransform(scrollY, [p0, p1, p2, p5], [1, 0.95, 1.08, 1], { clamp: true });
  const scale     = useSpring(scaleRaw, { stiffness: 100, damping: 22 });

  const rotate    = 0;

  const rotateYRaw = useTransform(scrollY, [p3, p4], [0, 180], { clamp: true });
  const rotateY    = useSpring(rotateYRaw, { stiffness: 45, damping: 20 });

  const boxShadow = useTransform(
    scrollY,
    [p0, p2, p5],
    [
      "0 12px 32px rgba(0,0,0,0.14), 0 4px 8px rgba(0,0,0,0.07)",
      "0 52px 120px rgba(0,0,0,0.34), 0 20px 48px rgba(0,0,0,0.20)",
      "0 24px 60px rgba(0,0,0,0.20), 0 6px 16px rgba(0,0,0,0.10)",
    ]
  );

  if (reduced) {
    return (
      <div style={{ position: "absolute", top: coords.about.top, left: coords.about.left, width: coords.about.width, height: coords.about.height, borderRadius: 24, overflow: "hidden", zIndex: 31 }}>
        {!imageError && (
          <Image src="/profilepicture.jpeg" alt="Hameed — profile" fill priority sizes="280px"
            style={{ objectFit: "cover", objectPosition: "center top" }} onError={() => setImageError(true)} />
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", top, left, width, height, scale, rotate, perspective: "1200px", zIndex: 31, willChange: "transform" }}
      className="pointer-events-auto select-none"
    >
      <motion.div
        style={{ position: "relative", width: "100%", height: "100%", rotateY, transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT — Grayscale ── */}
        <motion.div
          style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden", background: "#111",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow }}
        >
          {!imageError ? (
            <Image src="/profilepicture.jpeg" alt="Hameed — black & white" fill priority
              sizes="(max-width: 768px) 240px, 320px" className="grayscale"
              style={{ objectFit: "cover", objectPosition: "center top" }} onError={() => setImageError(true)} />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase text-[#555]">Photo</div>
          )}
        </motion.div>

        {/* ── BACK — Full Color ── */}
        <motion.div
          style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden", background: "#111",
            transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow }}
        >
          {!imageError ? (
            <Image src="/profilepicture.jpeg" alt="Hameed — color" fill priority
              sizes="(max-width: 768px) 240px, 320px"
              style={{ objectFit: "cover", objectPosition: "center top" }} onError={() => setImageError(true)} />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase text-[#555]">Photo</div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
