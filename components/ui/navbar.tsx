"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { ArrowRight, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "About Me", href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

/* ── Morphing three-dots ➔ × icon ── */
function MorphingIcon({ open }: { open: boolean }) {
  const reduced = useSafeReducedMotion();
  const t = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 30 };

  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <motion.div
        animate={open ? { width: 18, height: 2, rotate:  45, x: 0, y: 0 }
                      : { width:  5, height: 5, rotate:   0, x: -7, y: 0 }}
        transition={t}
        style={{ backgroundColor: "var(--color-nav-bg)" }}
        className="absolute rounded-full"
      />
      <motion.div
        animate={{ opacity: open ? 0 : 1, scale: open ? 0 : 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.1 }}
        style={{ backgroundColor: "var(--color-nav-bg)" }}
        className="absolute w-[5px] h-[5px] rounded-full"
      />
      <motion.div
        animate={open ? { width: 18, height: 2, rotate: -45, x: 0, y: 0 }
                      : { width:  5, height: 5, rotate:   0, x: 7, y: 0 }}
        transition={t}
        style={{ backgroundColor: "var(--color-nav-bg)" }}
        className="absolute rounded-full"
      />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useSafeReducedMotion();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark) ? "dark" : "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Smooth ease-out curve — no spring bounce, feels premium
  const heightTransition = reduced
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <motion.nav
        initial={{ height: 64, borderRadius: 24 }}
        animate={{ height: open ? 312 : 64 }}
        transition={heightTransition}
        aria-label="Main navigation"
        style={{
          width:      340,
          background: "var(--color-nav-bg)",
          overflow:   "hidden",
          borderRadius: 24,
          border:     "1px solid var(--color-border)",
          boxShadow:  "0 16px 48px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.20)",
        }}
        className="flex flex-col"
      >
        {/* ── Top bar ── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "12px 12px 12px 24px",
            height:         64,
            flexShrink:     0,
          }}
        >
          <span
            style={{
              color:         "var(--color-nav-text)",
              fontFamily:    "var(--font-clash-display)",
              fontSize:      22,
              fontWeight:    700,
              letterSpacing: "0.01em",
              lineHeight:    1,
              userSelect:    "none",
            }}
          >
            Hameed
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              style={{
                background:     "transparent",
                border:         "none",
                borderRadius:   10,
                width:          40,
                height:         40,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                cursor:         "pointer",
                color:          "var(--color-nav-text)",
                outline:        "none",
                transition:     "opacity 0.2s, transform 0.2s",
              }}
              className="hover:opacity-80 active:scale-95"
            >
              {mounted ? (
                theme === "dark" ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />
              ) : (
                <div style={{ width: 18, height: 18 }} />
              )}
            </button>

            {/* Menu Hamburger Button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{
                background:     "var(--color-nav-text)",
                border:         "none",
                borderRadius:   10,
                width:          40,
                height:         40,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                cursor:         "pointer",
                flexShrink:     0,
                outline:        "none",
              }}
            >
              <MorphingIcon open={open} />
            </button>
          </div>
        </div>

        {/* ── Links ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           8,
            padding:       "0 16px 20px",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              initial="initial"
              animate={open ? "open" : "closed"}
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { opacity: 0, y: 8 },
                open: {
                  opacity: 1,
                  y: 0,
                  transition: reduced
                    ? { duration: 0 }
                    : {
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1] as const,
                        delay: i * 0.055 + 0.08,
                      },
                },
                closed: {
                  opacity: 0,
                  y: 8,
                  transition: reduced
                    ? { duration: 0 }
                    : {
                        duration: 0.18,
                        ease: [0.4, 0, 1, 1] as const,
                        delay: (NAV_LINKS.length - 1 - i) * 0.03,
                      },
                },
                hover: {},
                tap: { scale: reduced ? 1 : 0.98 }
              }}
              className="outline-none hover:bg-[var(--color-border)] focus:bg-[var(--color-nav-pill-bg)] focus:text-[var(--color-nav-pill-text)] active:bg-[var(--color-nav-pill-bg)] active:text-[var(--color-nav-pill-text)]"
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                background:     "var(--color-nav-pill-bg)",
                color:          "var(--color-nav-pill-text)",
                borderRadius:   10,
                padding:        "11px 20px",
                fontFamily:     "var(--font-clash-display)",
                fontSize:       15,
                fontWeight:     600,
                letterSpacing:  "-0.01em",
                textDecoration: "none",
                boxShadow:      "0 2px 8px rgba(0,0,0,0.06)",
                transition:     "background-color 0.25s ease, color 0.25s ease",
              }}
            >
              <motion.span
                variants={{
                  hover: reduced ? {} : { x: 2 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {link.label}
              </motion.span>
              <motion.span
                variants={{
                  initial: { opacity: 0, x: -8 },
                  closed: { opacity: 0, x: -8 },
                  open: { opacity: 0, x: -8 },
                  hover: reduced ? {} : { opacity: 1, x: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
