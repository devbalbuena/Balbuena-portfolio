import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated number counter that counts up smoothly when scrolled into view.
 * Supports prefix, suffix, and custom formatting functions.
 */
export default function CounterNumber({
  to,
  duration = 1.3,
  prefix = '',
  suffix = '',
  formatter,
  className = '',
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let frameId;

    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Quintic ease-out for a snappy launch and silky landing
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * to));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, to, duration]);

  const displayValue = formatter ? formatter(count) : `${prefix}${count}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
