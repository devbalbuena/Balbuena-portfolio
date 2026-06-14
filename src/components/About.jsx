import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, cardBody } from '../lib/ui';

export default function About() {
  return (
    <motion.section id="about" className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-4 group" variants={fadeInUp}>
        <User className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>About Me</h3>
      </motion.div>
      <motion.div className={`${cardBase} p-6`} variants={fadeInUp}>
        <div className={`space-y-4 leading-relaxed text-[15px] ${cardBody}`}>
          <p>
            I'm a 3rd-year IT student at{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              Father Saturnino Urios University
            </span>{' '}
            in Butuan City, deeply passionate about{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              full-stack web development
            </span>
            . I love taking complex problems and turning them into clean, efficient, and
            user-friendly web systems.
          </p>
          <p>
            Currently I specialize in the{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              Laravel ecosystem
            </span>{' '}
            for robust backends and{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              React/Next.js
            </span>{' '}
            for dynamic frontends, with a growing focus on integrating AI automation into
            real-world applications — building smarter and faster.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
