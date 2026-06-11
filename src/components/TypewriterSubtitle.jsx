import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../motion/variants';

const ROLES = ['Full-Stack Developer', 'Laravel Developer', 'AI Enthusiast'];
const TYPE_MS = 75;
const DELETE_MS = 45;
const PAUSE_MS = 2000;

export default function TypewriterSubtitle() {
  const [text, setText] = useState('');

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const role = ROLES[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setText(role.slice(0, charIndex));
        if (charIndex >= role.length) {
          deleting = true;
          timer = window.setTimeout(tick, PAUSE_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setText(role.slice(0, charIndex));
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        timer = window.setTimeout(tick, TYPE_MS);
        return;
      }
      timer = window.setTimeout(tick, DELETE_MS);
    };

    timer = window.setTimeout(tick, TYPE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.h2
      className="text-lg text-slate-500 dark:text-slate-300 font-medium mb-3 min-h-[1.75rem]"
      variants={fadeInUp}
    >
      <span>{text}</span>
      <span className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-0.5 bg-purple-600 dark:bg-purple-400 animate-pulse" />
      <span className="text-slate-400 dark:text-slate-500"> · IT Student</span>
    </motion.h2>
  );
}
