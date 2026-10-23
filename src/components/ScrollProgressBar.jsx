import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[150] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
        style={{ scaleX }}
      >
        {/* Soft atmospheric glow at the advancing edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-400 blur-[4px] opacity-90" />
        {/* High-intensity crisp center pin */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
      </motion.div>
    </div>
  );
}

