"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { ArrowUpRight } from "lucide-react";

interface AboutProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
}

export default function About({ placeholderRef }: AboutProps) {
  const reduced = useSafeReducedMotion();

  // Fade-up transitions for grid items
  const itemTransition = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
  });

  return (
    <section
      id="about"
      style={{
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        paddingLeft:  "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
        background: "var(--color-paper)",
      }}
      className="w-full border-t border-[var(--color-border)]"
    >
      <div className=" max-w-[1440px]">
        {/* 
          Swiss Grid: items-stretch keeps column heights matching.
          We center all columns vertically so they align with the middle card.
        */}
        <div className="grid grid-cols-1 gap-[var(--spacing-grid)] md:grid-cols-3 md:gap-12 lg:gap-16 items-stretch">
          
          {/* ── Left Column: Greeting & Intro (Centered Vertically) ── */}
          <motion.div 
            {...itemTransition(0.1)} 
            className="flex flex-col gap-4 md:gap-8 justify-end py-1 text-center md:text-left"
          >
            <h2 
              className="font-sans font-black tracking-[-0.03em] text-[var(--color-ink)]" 
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", lineHeight: 0.9 }}
            >
              Hey!
            </h2>
            
            <p className="text-[17px] sm:text-[19px] lg:text-[22px] font-medium leading-[1.4] tracking-[0.03em] text-[var(--color-ink)]">
              I&apos;m Hameed, an aspiring fullstack developer based in Tamil Nadu, India, focused on building end-to-end web applications.
            </p>
          </motion.div>

          {/* ── Middle Column: Portrait Profile Placeholder ── */}
          <div className="flex justify-center items-center w-full order-first md:order-none">
            <div
              ref={placeholderRef}
              style={{
                width:        "clamp(200px, 55vw, 280px)",
                height:       "clamp(250px, 68vw, 350px)",
                borderRadius: "var(--radius-card)",
              }}
            />
          </div>

          {/* ── Right Column: Paragraphs & CTA Link (Centered Vertically) ── */}
          <motion.div 
            {...itemTransition(0.3)} 
            className="flex flex-col gap-4 md:gap-8 justify-center py-1 text-[var(--color-secondary)] font-sans"
            style={{ paddingRight: "clamp(0px, 2vw, 24px)" }}
          >
            <p className="text-[15px] lg:text-[17px] leading-[1.65] tracking-[0.015em] font-medium">
              I&apos;m a software developer driven by crafting complete software systems—from highly responsive, pixel-perfect user interfaces to robust backends and optimized APIs.
            </p>
            
            <p className="text-[15px] lg:text-[17px] leading-[1.65] tracking-[0.015em] font-medium">
              I enjoy designing database architectures, implementing secure authentication, and orchestrating server-side logic, bridging the gap between client expectations and system scalability.
            </p>

            {/* Custom CTA arrow link */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 group text-[15px] lg:text-[16px] font-bold text-[var(--color-ink)] tracking-[0.01em] hover:opacity-80 transition-opacity"
              >
                <span>Get Started</span>
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[var(--color-ink)]/10 bg-[#EBEBEB] dark:bg-[#222222] text-[var(--color-ink)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200">
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
