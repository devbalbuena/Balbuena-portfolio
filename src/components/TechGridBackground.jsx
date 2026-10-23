import { motion } from 'framer-motion';

export default function TechGridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Precision Dot-Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(var(--grid-dot-color, rgba(100, 116, 139, 0.28)) 1.25px, transparent 1.25px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 95%)',
        }}
      />

      {/* Floating Ambient Glowing Orb 1 (Top Left / Violet) */}
      <motion.div
        className="absolute top-[-5%] left-[-10%] w-[580px] h-[580px] rounded-full blur-[120px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/12 to-pink-500/10 dark:from-indigo-600/25 dark:via-purple-600/20 dark:to-pink-600/15"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'transform' }}
      />

      {/* Floating Ambient Glowing Orb 2 (Right Center / Fuchsia) */}
      <motion.div
        className="absolute top-[35%] right-[-10%] w-[540px] h-[540px] rounded-full blur-[130px] bg-gradient-to-bl from-purple-500/15 via-violet-500/12 to-indigo-500/10 dark:from-purple-600/25 dark:via-violet-600/20 dark:to-indigo-600/15"
        animate={{
          x: [0, -45, 25, 0],
          y: [0, 35, -25, 0],
          scale: [1, 0.95, 1.07, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{ willChange: 'transform' }}
      />

      {/* Floating Ambient Glowing Orb 3 (Bottom Center-Left / Cyan-Emerald Accent) */}
      <motion.div
        className="absolute bottom-[-10%] left-[15%] w-[520px] h-[520px] rounded-full blur-[130px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-600/15 dark:via-blue-600/15 dark:to-purple-600/15"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.06, 0.94, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
