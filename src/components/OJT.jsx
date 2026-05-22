import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, cardTitle, cardBody } from '../lib/ui';

export default function OJT() {
  return (
    <motion.section className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-4 group" variants={fadeInUp}>
        <Briefcase className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>On-the-Job Training</h3>
      </motion.div>

      <motion.div className={`${cardBase} p-6`} variants={fadeInUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <h4 className={cardTitle}>Full-Stack Developer Intern</h4>
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 border border-purple-100 dark:border-purple-500/30 px-2.5 py-1 rounded-md mt-2 sm:mt-0 inline-block w-max">
            June 2026 - Present
          </span>
        </div>
        <p className={`text-sm font-medium ${cardBody} mb-4`}>Tech Company Name Inc.</p>

        <ul
          className={`space-y-2 text-[14px] ${cardBody} list-disc list-inside ml-1 marker:text-gray-300 dark:marker:text-slate-600`}
        >
          <li>
            Assisted in the development and maintenance of scalable web applications using
            Laravel and React.
          </li>
          <li>
            Collaborated with senior developers to design database schemas and optimize SQL
            queries.
          </li>
          <li>
            Implemented responsive UI components based on Figma mockups using Tailwind CSS.
          </li>
          <li>
            Participated in daily stand-ups and agile workflows to ensure timely delivery of
            features.
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
}
