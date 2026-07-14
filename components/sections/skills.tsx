"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// ── ACCURATE BRAND LOGO SVGs (Official brand geometries) ──

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 sm:w-11 sm:h-11" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 180 180" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <circle cx="90" cy="90" r="90" fill="var(--color-ink)" />
      <path d="M140 135.5L78.6 53.6H62v72.8h13.9V71.8l56 74.4c2.8-2.6 5.4-5.5 8.1-8.5zM108 53.6h14v72.8h-14V53.6z" fill="var(--color-paper)" />
    </svg>
  );
}

function TSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11">
      <path d="M2 2h20v20H2V2z" fill="#3178C6" />
      <path d="M12.28 17.06c-.66.86-1.76 1.29-3.28 1.29-1.56 0-2.75-.48-3.57-1.44-.82-.96-1.23-2.36-1.23-4.2V11.3h2.36v1.44c0 1.21.26 2.09.77 2.64.51.55 1.25.82 2.22.82 1.01 0 1.76-.23 2.26-.69.5-.46.75-1.16.75-2.09V6.36h2.38v7.08c0 1.5-.38 2.64-1.14 3.42-.76.78-1.84 1.17-3.26 1.17v-1.1c1-.04 1.72-.25 2.15-.65.43-.4.65-1.04.65-1.93V17.06h-2.38zM17.82 9.84h-6.28V12h1.92v6.24h2.44V12h1.92V9.84z" fill="#FFFFFF" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.002 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38BDF8" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <path d="M12 2a1 1 0 00-.5.1l-8 4.6A1 1 0 003 7.6v9.2a1 1 0 00.5.9l8 4.6a1 1 0 001 0l8-4.6a1 1 0 00.5-.9V7.6a1 1 0 00-.5-.9l-8-4.6A1 1 0 0012 2zm-1 3.5V11H5.7l5.3-6.5zM5 12.5h6v6.9L5.2 13a1 1 0 01-.2-.5zm8 6.9V12.5h6l-5.8 6.4a1 1 0 01-.2.5zm6-7.9h-6V5.6l5.8 6.3a1 1 0 01.2.5z" fill="#339933" />
    </svg>
  );
}

function ExpressIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <rect width="48" height="48" rx="8" fill="#353535" />
      <text x="10" y="30" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#FFFFFF">ex</text>
    </svg>
  );
}

function FirebaseIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-10 h-10 sm:w-11 sm:h-11">
      <path d="M5.82 24.64l5.16-10.34 2.8-5.32c.38-.72 1.48-.72 1.86 0l1.7 3.22 3.86-7.3c.4-.76 1.54-.73 1.9.05L26.2 24.64z" fill="#FFA000" />
      <path d="M16.12 3.51c-.38-.72-1.48-.72-1.86 0L5.82 24.64l10.3-6.1z" fill="#F57C00" />
      <path d="M26.2 24.64L19.02 11l-2.9 5.54z" fill="#FFCA28" />
      <path d="M5.82 24.64l10.3 6.1c.46.27 1.04.27 1.5 0l8.58-5.08-20.38-1.02z" fill="#FFCA28" />
    </svg>
  );
}

function RestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9H7a2 2 0 0 0-2 2v1a2 2 0 0 1-2 2 2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1M16 9h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 0-2 2v1a2 2 0 0 1-2 2h-1" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function MongoIcon() {
  return (
    <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
      <path d="M58.2 2c-.6 0-1.2.3-1.6.7-.4.5-.6 1.1-.6 1.7.3 6.2.8 12.4 1.5 18.6 1.8 15.7 4.2 31.3 7 46.8.3 1.6.5 3.3.7 4.9.2 1.3-.1 2.6-.9 3.6-1 1.2-2.5 1.9-4 1.9h-.6c-5.7-.3-11.4-.9-17-2.1-7.2-1.5-14.2-4.1-20.6-7.9-1.9-1.1-3.6-2.5-5-4.1-.7-.8-1.7-1.3-2.8-1.3-.6 0-1.2.3-1.6.7s-.6 1.1-.6 1.7c.4 5.3 1.9 10.5 4.5 15.2 4.1 7.6 9.9 14.1 17 19 6.8 4.7 14.5 8.1 22.6 10.1 5.3 1.3 10.7 2.1 16.2 2.5 1.5.1 3-.3 4.1-1.3s1.7-2.4 1.7-4v-1.1c.3-13.6.8-27.1 1.5-40.7.8-15.6 2-31.2 3.6-46.7 1-9.9 2.3-19.8 3.8-29.6.2-.9 0-1.9-.5-2.7S66 1.9 65 1.9h-.2c-2.2.1-4.4.1-6.6.1zm8.4 1c-.8.5-1.3 1.3-1.6 2.2-.2 1.1-.3 2.2-.4 3.3C63 21 61.6 35.5 60.5 50.1c-.8 10.9-1.3 21.8-1.5 32.7v.9c0 1 .5 2 1.3 2.6.9.7 2 1 3.1.8h.4c3.4-.6 6.8-1.5 10-2.8 7.3-3 13.8-7.7 18.8-13.7 4-4.8 7.1-10.4 9-16.4.5-1.5.2-3.1-.7-4.4S98.2 48 96.6 48h-.6c-5 .3-10 .1-14.9-.6-6.8-.9-13.4-2.8-19.7-5.6-2.6-1.1-4.8-2.7-6.7-4.7-.8-.8-1.2-2-1.2-3.1 0-.9.3-1.8.9-2.5 4-4.6 7.4-9.8 10.1-15.4 3.2-6.6 5.4-13.6 6.7-20.7.3-1.7-.2-3.4-1.3-4.6S67.5 2.5 66.6 3z" fill="#47A248" />
    </svg>
  );
}

function FirestoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="none" stroke="#FFA000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l8-4 8 4-8 4-8-4z" fill="#FFCA28" stroke="none" />
      <path d="M4 11l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </svg>
  );
}

function MySQLIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="#00758F">
      <path d="M12.2 2c-3.2 0-6.1 1.7-7.7 4.5C3.3 8.7 3 11.2 3.7 13.7c.3.9.7 1.7 1.3 2.4l-.8 2.3c-.2.6.4 1.1.9.8l2.3-.8c.7.6 1.5 1 2.4 1.3 2.5.7 5 .4 7.2-.8 2.8-1.6 4.5-4.5 4.5-7.7 0-4.9-4-8.9-8.9-8.9zm4.2 12c-.4.8-1 1.5-1.8 1.9-.8.4-1.7.6-2.6.6H11v-1.5h1.2c1.2 0 2.2-.8 2.5-1.9.1-.4.1-.8 0-1.2l1.4-.4c.3.8.3 1.7 0 2.5zm-5-3.5c-.4 0-.8-.3-.8-.8V8.5c0-.4.3-.8.8-.8s.8.3.8.8v1.2c0 .5-.4.8-.8.8z" fill="none" stroke="#00758F" strokeWidth="1.5" />
      <path d="M7 11.5c.3-1.5 1.2-2.8 2.5-3.5.7-.4 1.5-.6 2.3-.6v1.5c-.5 0-1 .1-1.5.4-.9.5-1.5 1.4-1.7 2.4l-1.6-.2z" />
    </svg>
  );
}

function SQLIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="none" stroke="#4169E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11">
      <text x="12" y="13" fontFamily="sans-serif" fontSize="9" fontWeight="black" textAnchor="middle" fill="currentColor">aws</text>
      <path d="M4 16.5c4 2.5 12 2.5 16 0" fill="none" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 15.5l1.5 1.2-1.8.8" fill="none" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  );
}

function RenderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="none" stroke="#46E3B7" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 19c6-2 9-8 9-14M19 5c-6 2-9 8-9 14" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <path d="M23.2 10.4L13.6.8c-.9-.9-2.3-.9-3.2 0L.8 10.4c-.9.9-.9 2.3 0 3.2l9.6 9.6c.9.9 2.3.9 3.2 0l9.6-9.6c.9-.9.9-2.3 0-3.2zM12 18c-1.1 0-2-.9-2-2 0-.6.3-1.1.7-1.4V10.8c-.4-.3-.7-.8-.7-1.4 0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.1-.7 1.4v3.8c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2zm3.8-8.2c-.4-.3-.7-.8-.7-1.4 0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2c-.6 0-1.1-.3-1.4-.7l-2.4 2.4c.3.4.5.9.5 1.5 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.1.7-1.4V10.8c-.4-.3-.7-.8-.7-1.4 0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.1-.7 1.4l2.4-2.4z" fill="#F05032" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="currentColor">
      <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
    </svg>
  );
}

function VSCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="#007ACC">
      <path d="M1.5 17.75L16.5 22.5V1.5L1.5 6.25v11.5zM16.5 22.5l5.5-3.5V5l-5.5-3.5v21z" fill="#007ACC" opacity="0.8" />
      <path d="M22 5v14l-5.5 3.5V1.5L22 5z" fill="#007ACC" />
      <path d="M18.5 12l-10-6.7v13.4l10-6.7z" fill="#0078D4" />
      <path d="M6 8.3L2 12l4 3.7V8.3z" fill="#1F9CF0" />
    </svg>
  );
}

function PostmanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11" fill="#FF6C37">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.7l-2-2c-.4.2-.8.3-1.3.3-1.7 0-3-1.3-3-3s1.3-3 3-3c.5 0 .9.1 1.3.3l2-2c.9 1 1.4 2.4 1.4 3.7 0 2.2-1.1 4-2.4 5.7z" />
    </svg>
  );
}

// ── DATA STRUCTURES ──

interface Skill {
  name: string;
  color: string;
  icon: string | (() => React.JSX.Element);
  darkIcon?: string;
  invertOnDark?: boolean;
}

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend",
    skills: [
      { name: "React",        color: "#61DAFB",          icon: "/react-svgrepo-com.svg" },
      { name: "Next.js",      color: "var(--color-ink)", icon: "/nextjs-icon-svgrepo-com.svg",    invertOnDark: true },
      { name: "TypeScript",   color: "#3178C6",          icon: "/typescript-logo-svgrepo-com.svg" },
      { name: "Tailwind CSS", color: "#38BDF8",          icon: "/Tailwind CSS.svg" }
    ]
  },
  {
    id: "backend",
    number: "02",
    title: "Backend",
    skills: [
      { name: "Node.js",    color: "#339933",         icon: "/nodejs-1-logo-svgrepo-com.svg",  darkIcon: "/nodejs-dark.svg" },
      { name: "Express.js", color: "#828282",          icon: "/express-svgrepo-com.svg",       invertOnDark: true },
      { name: "Firebase",   color: "#FFA000",          icon: "/firebase-svgrepo-com.svg" },
      { name: "Prisma",     color: "#2D3748",          icon: "/prisma-svgrepo-com.svg",        invertOnDark: true }
    ]
  },
  {
    id: "database",
    number: "03",
    title: "Database",
    skills: [
      { name: "MongoDB",   color: "#47A248", icon: "/mongo-svgrepo-com.svg" },
      { name: "Firestore", color: "#FF7400", icon: "/firestore-svgrepo-com.svg" },
      { name: "Redis",     color: "#DC382D", icon: "/redis-svgrepo-com.svg" },
      { name: "SQL",       color: "#4169E1", icon: SQLIcon }
    ]
  },
  {
    id: "cloud",
    number: "04",
    title: "Cloud & Deployment",
    skills: [
      { name: "AWS",    color: "#FF9900",          icon: "/aws-svgrepo-com.svg",               darkIcon: "/aws-dark.svg" },
      { name: "Docker", color: "#2496ED",          icon: "/docker-svgrepo-com.svg" },
      { name: "Vercel", color: "var(--color-ink)", icon: "/vercel-fill-svgrepo-com.svg",      invertOnDark: true },
      { name: "Render", color: "#46E3B7",          icon: "/Render Symbol SVG.svg",             invertOnDark: true }
    ]
  },
  {
    id: "tools",
    number: "05",
    title: "Version Control & Tools",
    skills: [
      { name: "Git",     color: "#F05032",          icon: "/git-svgrepo-com.svg" },
      { name: "GitHub",  color: "var(--color-ink)", icon: "/github-142-svgrepo-com.svg",       invertOnDark: true },
      { name: "VS Code", color: "#007ACC",          icon: "/vscode-svgrepo-com.svg" },
      { name: "Postman", color: "#FF6C37",          icon: "/Postman.svg" }
    ]
  }
];

// ── TECH CARD ──

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      style={{ boxShadow: "var(--shadow-soft)" }}
      className="relative bg-[var(--color-card)] border border-[var(--color-border)] rounded-[20px] flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 group transition-all duration-100 hover:shadow-lg hover:border-[var(--color-ink)]/20 cursor-pointer"
    >
      {/* Tooltip */}
      <div className="
        pointer-events-none absolute top-full mt-10 left-1/2 -translate-x-1/2
        text-[var(--color-ink)]
        font-mono text-[12px] font-bold uppercase tracking-widest whitespace-nowrap
        opacity-0 scale-95 -translate-y-1
        group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
        transition-all duration-100 ease-out
        z-50
      ">
        {skill.name}
      </div>

      {/* Icon */}
      <div className="text-[var(--color-ink)] transition-transform duration-100 group-hover:scale-110 w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center">
        {typeof skill.icon === "string" ? (
          <>
            <Image
              src={skill.icon}
              alt={skill.name}
              fill
              className={`object-contain transition-all duration-100 ${
                skill.invertOnDark ? "dark:invert dark:brightness-[0.95]" : ""
              } ${skill.darkIcon ? "dark:hidden" : ""}`}
            />
            {skill.darkIcon && (
              <Image
                src={skill.darkIcon}
                alt={skill.name}
                fill
                className="object-contain transition-all duration-100 hidden dark:block"
              />
            )}
          </>
        ) : (
          <skill.icon />
        )}
      </div>
    </motion.div>
  );
}

// ── SPIDER SVG COMPONENT ──

function SpiderIcon({ className }: { className?: string }) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 736 736"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g
        transform="translate(0.000000,736.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M4535 6718 c2 -7 27 -89 54 -183 136 -467 215 -865 228 -1157 l6 -147 -27 -11 c-35 -13 -411 -13 -521 0 -44 5 -105 12 -136 16 -54 6 -57 5 -75 -21 -29 -42 -125 -144 -158 -168 l-29 -20 -18 24 c-53 71 -67 84 -113 105 -28 13 -52 20 -54 15 -2 -5 11 -37 27 -70 30 -59 41 -121 21 -121 -5 0 -21 18 -34 39 -35 55 -43 57 -65 12 -32 -62 -68 -63 -96 0 -10 21 -21 39 -25 39 -3 0 -21 -20 -38 -45 -32 -46 -52 -51 -52 -14 0 11 16 51 35 89 19 38 31 71 27 74 -26 16 -144 -71 -163 -121 -5 -12 -13 -23 -19 -23 -17 0 -134 104 -157 141 -52 80 -40 75 -139 60 -99 -15 -553 -27 -608 -17 -32 6 -35 10 -41 49 -18 123 49 572 141 942 33 133 125 460 139 498 4 9 3 17 -2 17 -6 0 -31 -37 -57 -82 -135 -236 -286 -601 -382 -922 -77 -257 -141 -536 -129 -557 9 -14 206 -169 216 -169 4 0 24 9 43 21 25 15 70 24 168 34 229 23 455 38 490 31 43 -8 103 -57 139 -115 30 -46 36 -71 19 -71 -23 0 -122 43 -184 81 -86 52 -139 59 -221 29 -184 -68 -399 -131 -735 -216 -106 -27 -153 -25 -171 8 -15 27 -6 208 22 468 31 291 63 455 123 636 49 145 215 570 280 717 49 110 34 100 -72 -48 -169 -234 -304 -489 -392 -740 -56 -159 -210 -732 -255 -950 -9 -44 -21 -90 -27 -102 -9 -18 -4 -30 37 -83 26 -34 77 -86 114 -117 113 -95 186 -116 232 -67 49 53 249 133 563 226 147 43 186 51 281 55 202 8 447 -60 389 -108 -23 -19 -25 -25 -345 -9 -88 17 -115 9 -169 -52 -101 -113 -215 -221 -360 -338 -30 -25 -57 -47 -60 -50 -34 -36 -400 -310 -530 -397 -186 -124 -215 -133 -292 -84 -57 36 -68 28 -68 -48 0 -179 65 -728 116 -981 53 -264 215 -722 380 -1075 62 -133 199 -363 210 -352 3 2 -5 29 -17 58 -77 197 -206 616 -258 844 -49 214 -89 485 -125 840 -28 279 -30 336 -12 406 29 112 37 120 426 424 396 309 535 421 613 494 72 66 97 83 159 105 73 26 175 46 236 46 47 0 41 -24 -20 -84 -167 -162 -243 -215 -330 -230 -20 -4 -47 -15 -60 -25 l-23 -19 0 -634 c1 -782 6 -844 131 -1483 110 -562 265 -975 477 -1268 27 -37 51 -66 53 -65 2 2 -21 60 -50 128 -121 283 -220 645 -270 990 -65 447 -81 1083 -45 1790 12 218 10 255 -16 361 -5 20 5 40 53 106 170 228 410 397 273 191 -25 -36 -43 -76 -47 -105 -9 -61 2 -235 21 -348 56 -315 234 -853 327 -987 25 -36 33 -35 44 5 7 24 16 33 35 35 22 3 27 -2 35 -29 5 -18 14 -34 19 -36 28 -9 121 195 206 452 94 284 151 528 169 727 14 151 4 208 -51 295 -43 68 -42 92 2 78 34 -11 236 -218 287 -295 37 -56 42 -69 35 -95 -4 -16 -5 -158 -3 -315 9 -549 5 -1300 -8 -1450 -48 -544 -160 -1030 -322 -1391 -58 -131 -42 -126 51 16 221 333 363 762 484 1460 50 285 55 321 71 510 21 235 24 1317 5 1354 -14 25 -53 46 -102 55 -55 10 -143 72 -258 182 -72 69 -102 104 -97 113 17 27 229 -10 321 -56 17 -9 57 -41 90 -72 33 -31 74 -67 90 -81 34 -28 396 -315 436 -345 60 -45 338 -263 394 -308 147 -120 163 -184 130 -538 -22 -228 -71 -605 -95 -735 -47 -244 -151 -613 -256 -901 -51 -140 -65 -183 -59 -183 15 0 122 185 200 345 84 172 120 259 256 620 87 231 140 448 183 750 52 357 82 764 58 779 -7 4 -27 -5 -47 -19 -19 -15 -52 -29 -74 -32 -54 -7 -117 30 -411 239 -71 51 -314 242 -440 346 -106 88 -262 239 -335 325 -37 42 -88 56 -152 39 -54 -15 -275 -15 -325 -1 -51 13 -48 36 5 59 86 38 176 53 322 54 139 1 141 1 300 -47 317 -94 545 -185 589 -235 25 -28 59 -28 122 2 84 39 283 243 255 260 -5 4 -15 32 -21 64 -50 254 -233 924 -295 1082 -71 179 -192 407 -308 579 -62 92 -148 203 -153 198 -3 -2 8 -30 22 -63 61 -136 235 -579 278 -708 25 -76 55 -177 66 -225 54 -247 110 -828 87 -897 -16 -47 -82 -41 -347 36 -74 21 -198 55 -275 76 -77 20 -185 55 -239 76 -123 50 -167 49 -253 -5 -53 -32 -175 -87 -195 -87 -16 0 -8 38 16 73 38 55 98 106 134 113 33 6 403 -18 548 -36 40 -5 92 -19 116 -31 l45 -22 94 73 c137 105 131 94 109 192 -58 266 -166 634 -245 833 -94 238 -205 472 -281 593 -32 50 -48 66 -39 40z" />
      </g>
    </svg>
  );
}

// ── MAIN SKILLS SECTION ──

export default function Skills() {
  // Mobile responsive layout scroll scrub and mount config trigger
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef        = useRef<SVGPathElement>(null);
  const glowPathRef    = useRef<SVGPathElement>(null);
  const starRef        = useRef<HTMLDivElement>(null);
  const reduced        = useSafeReducedMotion();

  const [dotCoords, setDotCoords]       = useState<{ x: number; y: number }[]>([]);
  const [revealedRows, setRevealedRows] = useState<boolean[]>([false, false, false, false, false]);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    // Explicitly initialize state on mount
    setIsMobile(window.innerWidth < 768);
    
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        setIsMobile(currentWidth < 768);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Read coordinate positions of the invisible anchors directly from the DOM
  const updateCoords = () => {
    if (!containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const centerX = parentRect.width / 2;

    const selector = isMobile ? ".mobile-anchor" : ".desktop-anchor";
    const anchors = Array.from(containerRef.current.querySelectorAll(selector));

    const coords = anchors.map((dot) => {
      const rect = dot.getBoundingClientRect();
      return {
        x: isMobile ? (rect.left - parentRect.left + rect.width / 2) : centerX,
        y: rect.top - parentRect.top + rect.height / 2,
      };
    });
    setDotCoords(coords);
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!mounted) return;
    
    let lastWidth = window.innerWidth;
    
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        updateCoords();
      }
    };

    const timer = setTimeout(updateCoords, 150);

    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(() => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== lastWidth) {
          lastWidth = currentWidth;
          updateCoords();
        }
      });
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [mounted, isMobile]);

  // Construct a straight vertical line connecting the dots
  const generatePath = () => {
    if (dotCoords.length < 2) return "";
    let d = `M ${dotCoords[0].x} ${dotCoords[0].y}`;
    for (let i = 1; i < dotCoords.length; i++) {
      d += ` L ${dotCoords[i].x} ${dotCoords[i].y}`;
    }
    return d;
  };

  const pathD = generatePath();

  // GSAP SCROLLTRIGGER FOR ENTRANCE REVEAL OF EACH ROW & MOVING STAR
  useEffect(() => {
    if (!mounted || !containerRef.current || !pathD || dotCoords.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Reveal category rows when scroll reaches them
      const rows = gsap.utils.toArray(".category-row") as HTMLElement[];
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%", // when top of the row hits 90% of viewport
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // 2. Animate the star icon along the invisible zigzag path on scroll
      const pathElement = pathRef.current;
      const glowElement = glowPathRef.current;
      const starElement = starRef.current;
      if (pathElement && glowElement && starElement && !reduced) {
        // Initialize path stroke dash offset
        const length = pathElement.getTotalLength();
        gsap.set([pathElement, glowElement], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // Position the star at the first point immediately on load
        gsap.set(starElement, {
          x: dotCoords[0].x,
          y: dotCoords[0].y,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 50%",
        });

        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: firstRow,
            start: "top 40%",
            endTrigger: lastRow,
              end: isMobile ? "bottom 95%" : "bottom 85%",
            scrub: 1.2,
          },
        });

        // Animate active path drawing
        tl.to([pathElement, glowElement], {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1,
        }, 0);

        // Animate star traveling
        tl.to(starElement, {
          ease: "none",
          duration: 1,
          immediateRender: true,
          motionPath: {
            path: pathElement,
            align: pathElement,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        }, 0);
      }
    }, containerRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [mounted, pathD, dotCoords, reduced, isMobile]);

  return (
    <section
      id="skills"
      style={{
        paddingTop: "",
        paddingBottom: "var(--spacing-section)",
        paddingLeft:  "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
        background: "var(--color-paper)",
      }}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── CONTENT CONTAINER ── */}
      <div className="relative mx-auto w-full max-w-[1440px] z-10 flex flex-col items-center">
        {/* Title Block */}
        <div className="text-center max-w-[1000px] mx-auto" style={{ marginBottom: "4rem" }}>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[var(--color-ink)] tracking-[0.005em] mb-6 uppercase">
            Skills &amp; Technologies
          </h2>
          <p className="text-[var(--color-secondary)] font-sans font-medium text-[15px] sm:text-[17px] leading-relaxed ">
            A curated set of technologies and tools I use to build scalable, performant, and beautiful web experiences.
          </p>
        </div>

        {/* ── TIMELINE ZIGZAG WRAPPER ── */}
        <div ref={containerRef} className="relative w-full flex flex-col gap-28 md:gap-36 lg:gap-40 ">

          {/* Symmetrical Vertical Progress Line SVG Overlay */}
          {mounted && pathD && dotCoords.length > 0 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Solid Grey Track Line (Outer Channel / Web Border) */}
              <path
                d={pathD}
                fill="none"
                stroke=""
                strokeWidth="8"
                opacity="0.8"
                strokeLinecap="round"
              />

              {/* Active Glow Progress Line */}
              <path
                ref={glowPathRef}
                d={pathD}
                fill="none"
                className="stroke-black dark:stroke-white"
                strokeWidth="15"
                opacity="0.25"
                filter="url(#line-glow)"
                strokeLinecap="round"
              />

              {/* Active Sharp Progress Line (Inner Core) */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                className="stroke-black dark:stroke-white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Glowing Star Icon animated by GSAP */}
          {mounted && pathD && dotCoords.length > 0 && !reduced && (
            <div
              ref={starRef}
              className="absolute w-16 h-16 pointer-events-none z-30"
              style={{ left: 0, top: 0 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glowing Aura Filter */}
                <div className="absolute w-10 h-10 rounded-full bg-red-500/20 blur-md animate-pulse" />
                <SpiderIcon className="w-14 h-14 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.75)]" />
              </div>
            </div>
          )}

          {/* ── RENDER CATEGORIES ── */}
          {SKILL_CATEGORIES.map((category, index) => {
            const isEven   = index % 2 === 0;

            return (
              <div
                key={category.id}
                className="category-row relative w-full"
                style={{ opacity: reduced ? 1 : 0 }}
              >
                {/* Desktop Flex Layout (Zigzag offset axis & side alignment) */}
                <div className={`hidden md:flex flex-row items-center w-full relative ${isEven ? "justify-between" : "justify-end"}`}>
                  
                  {/* Category Content Column */}
                  <div className={`flex flex-col gap-4 w-auto ${isEven ? "items-start" : "items-start text-left"}`}>
                    <div className={`flex flex-col ${isEven ? "items-start" : "items-start"}`}>
                      <h3 className="font-sans font-black text-3xl text-[var(--color-ink)] uppercase leading-none ">
                        {category.title}
                      </h3>
                    </div>
                    <div className={`flex flex-wrap gap-4 ${isEven ? "justify-start" : "justify-start"} w-full`}>
                      {category.skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>

                  {/* Absolute Center Timeline Anchor for Star Motion Path */}
                  <div
                    className={`desktop-anchor absolute left-1/2 z-20 w-1 h-1 pointer-events-none opacity-0 ${
                      index === 0
                        ? "top-[30px]"
                        : "top-1/2 -translate-y-1/2"
                    } -translate-x-1/2`}
                  />

                </div>

                {/* Mobile Flex Layout (Timeline dot on left, content cards on right) */}
                <div className="flex md:hidden flex-row items-start gap-5 w-full">
                  {/* Invisible mobile anchors for mobile tracking if needed */}
                  <div
                    className="mobile-anchor w-1 h-1 pointer-events-none opacity-0 shrink-0 mt-3.5 z-20"
                  />

                  {/* Content on Right for Mobile */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col items-start">
                      <span className="font-mono text-[10px] text-violet-500 font-bold uppercase tracking-wider mb-1">
                        {category.number}
                      </span>
                      <h3 className="font-sans font-black text-2xl text-[var(--color-ink)] uppercase leading-none tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-start">
                      {category.skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}