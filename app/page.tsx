"use client";

import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Hero   from "@/components/sections/hero";
import About  from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import FloatingProfileCard from "@/components/ui/floating-profile-card";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export default function Home() {
  const heroPlaceholderRef  = useRef<HTMLDivElement>(null);
  const aboutPlaceholderRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const reduced = useSafeReducedMotion();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({
    hero:      { top: 0, left: 0, width: 240, height: 300 },
    about:     { top: 0, left: 0, width: 280, height: 350 },
    scrollEnd: 800,
  });

  const measure = () => {
    if (!heroPlaceholderRef.current || !aboutPlaceholderRef.current || !mainRef.current) return false;

    // Find coordinates relative to the closest positioned ancestor (mainRef)
    const parentRect = mainRef.current.getBoundingClientRect();
    const parentTop = parentRect.top + window.scrollY;
    const parentLeft = parentRect.left + window.scrollX;

    const pageRect = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        top: r.top + window.scrollY - parentTop,
        left: r.left + window.scrollX - parentLeft,
        width: r.width,
        height: r.height,
      };
    };

    const h = pageRect(heroPlaceholderRef.current);
    const a = pageRect(aboutPlaceholderRef.current);

    // Calculate the maximum possible scroll depth on the document
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = Math.max(0, scrollHeight - window.innerHeight);

    // Target scroll centers the About card placeholder in the viewport
    const targetScroll = a.top - (window.innerHeight - a.height) / 2;

    // Clamp the docking scrollEnd to the actual maximum scrollable depth
    const scrollEnd = Math.max(300, Math.min(targetScroll, maxScroll));

    setCoords({ hero: h, about: a, scrollEnd });
    return true;
  };

  useEffect(() => {
    // rAF ensures DOM has been fully laid out before measuring
    const id = requestAnimationFrame(() => {
      const ok = measure();
      if (ok) {
        setVisible(true);
        if (!reduced && heroPlaceholderRef.current) {
          heroPlaceholderRef.current.setAttribute("data-card-active", "true");
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  useEffect(() => {
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        requestAnimationFrame(measure);
      }
    };

    const ro = new ResizeObserver(() => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        requestAnimationFrame(measure);
      }
    });

    if (heroPlaceholderRef.current)  ro.observe(heroPlaceholderRef.current);
    if (aboutPlaceholderRef.current) ro.observe(aboutPlaceholderRef.current);
    if (typeof document !== "undefined" && document.body) {
      ro.observe(document.body);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", () => { requestAnimationFrame(measure); });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", () => { requestAnimationFrame(measure); });
    };
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="relative min-h-screen">
        <Hero  placeholderRef={heroPlaceholderRef} />
        <About placeholderRef={aboutPlaceholderRef} />
        <Skills />
        {/* Only render FloatingProfileCard once coordinates are measured to ensure clean mounting */}
        {visible && (
          <FloatingProfileCard
            key="floating-profile-card"
            coords={coords}
            reduced={reduced}
          />
        )}
      </main>
    </>
  );
}
