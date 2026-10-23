import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton wraps an interactive element (button or link)
 * and gently pulls it toward the cursor when hovering nearby.
 */
export default function MagneticButton({
  children,
  className = '',
  pullStrength = 0.16,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // max subtle movement ~4px to 6px
    const deltaX = (clientX - centerX) * pullStrength;
    const deltaY = (clientY - centerY) * pullStrength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, mass: 0.15 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
