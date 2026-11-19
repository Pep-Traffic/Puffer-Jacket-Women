"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";

// A thin bar at the top of the page that fills as the reader moves down a
// long article. It helps readers keep their place, so it is motion with a job.
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? 1 : scrollYProgress }}
    />
  );
}
