"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";


/* ── Floating decorative symbol ── */
function FloatingSymbol({
  src,
  alt,
  width,
  height,
  delay = 0,
  rotate = 0,
  className = "",
  floatClass = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number; 
  rotate?: number;
  className?: string;
  floatClass?: string;
}) {
  const reduced = useSafeReducedMotion();

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className} ${!reduced ? floatClass : ""}`}
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 18 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
      }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              opacity: { delay, duration: 0.45, ease: "easeOut" },
              scale:   { delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
              rotate:  { delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
            }
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        draggable={false}
        style={{ height: "auto" }}
      />
    </motion.div>
  );
}

/* ── Fade-up reveal wrapper ── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useSafeReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

interface HeroProps {
  placeholderRef: React.RefObject<HTMLDivElement | null>;
}

export default function Hero({ placeholderRef }: HeroProps) {
  // Mobile responsive layout GPU floating animations trigger

  return (
    <section
  id="hero"
  className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background"
>
  <div
    className="
      relative
      flex
      flex-1
      flex-col
      items-center
      justify-end
      pt-16
      sm:pt-20
      lg:pt-24
    "
  >
    {/* Heading */}
    <div className="relative w-full px-4 sm:px-6 lg:px-10 text-center">

      {/* Star */}
      <FloatingSymbol
        src="/star.png"
        alt="Star"
        width={200}
        height={140}
        delay={0.35}
        floatClass="animate-float-star"
        className="
          left-1
          sm:left-10
          lg:left-16

          top-[34%]
          sm:top-[36%]
          lg:top-[80%]

          -translate-y-[85%]

          w-20
          sm:w-32
          lg:w-[200px]

          z-10
        "
      />

      {/* Heading */}
      <FadeUp delay={0.1}>
        <h1
          className="
            mt-2

            font-sans
            font-black
            uppercase

            leading-[0.88]
            tracking-[-0.03em]

            text-foreground

            text-[3.5rem]
            min-[380px]:text-[4rem]
            sm:text-[5.5rem]
            md:text-[7rem]
            lg:text-[8.5rem]
            xl:text-[10rem]
          "
        >
          SOFTWARE
          <br />
          DEVELOPER
        </h1>
      </FadeUp>

      {/* Triangle */}
      <FloatingSymbol
        src="/holo_triangle_rounded@4x.png"
        alt="Triangle"
        width={290}
        height={90}
        delay={0.5}
        rotate={-8}
        floatClass="animate-float-triangle"
        className="
          right-0
          sm:right-2
          lg:-right-2

          -bottom-14
          sm:-bottom-16
          lg:-bottom-24

          w-36
          sm:w-48
          lg:w-[290px]

          z-10
        "
      />
    </div>

    {/* Portrait */}
    <div
      className="
        relative
        z-10

        mt-8
        sm:mt-10
        lg:mt-12
      "
    >
      <div
        ref={placeholderRef}
        className="
          relative
          overflow-hidden
          rounded-2xl

          w-[200px]
          h-[250px]

          sm:w-[230px]
          sm:h-[290px]

          md:w-[250px]
          md:h-[315px]

          lg:w-[280px]
          lg:h-[350px]
        "
      >
        <Image
          src="/profilepicture.jpeg"
          alt="Hameed"
          fill
          priority
          sizes="(max-width:768px) 200px,(max-width:1024px) 240px,280px"
          className="object-cover object-top grayscale"
        />
      </div>
    </div>
  </div>
</section>
  );
}
