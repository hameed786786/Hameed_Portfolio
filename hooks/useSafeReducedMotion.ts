import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function useSafeReducedMotion() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (reduced ?? false) : false;
}
