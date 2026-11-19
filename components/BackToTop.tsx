"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";

export default function BackToTop() {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      className="ft__top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
    >
      Back to top <ArrowUp size={14} aria-hidden="true" />
    </button>
  );
}
