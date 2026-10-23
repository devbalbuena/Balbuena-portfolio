import { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

/**
 * Modern Aceternity/Linear-style Bento Spotlight Card.
 * Renders an ultra-smooth, GPU-accelerated radial spotlight that tracks the user's cursor.
 * Supports rendering as either a standard HTML element or a motion component.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColorLight = 'rgba(168, 85, 247, 0.08)',
  spotlightColorDark = 'rgba(168, 85, 247, 0.16)',
  size = 360,
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const bgLight = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColorLight}, transparent 80%)`;
  const bgDark = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColorDark}, transparent 80%)`;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden ${className}`}
      {...props}
    >
      {/* Light Mode Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 dark:hidden z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: bgLight,
        }}
        aria-hidden="true"
      />

      {/* Dark Mode Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 hidden dark:block z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: bgDark,
        }}
        aria-hidden="true"
      />

      {children}
    </Component>
  );
}
