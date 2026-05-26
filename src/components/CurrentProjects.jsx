import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, cardTitle, cardBody } from '../lib/ui';

export default function CurrentProjects() {
  return (
    <motion.section className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-4 group" variants={fadeInUp}>
        <Briefcase className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>Current Projects & Research</h3>
      </motion.div>

      <motion.div className={`${cardBase} p-6`} variants={fadeInUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <h4 className={cardTitle}>Lead Developer & Researcher</h4>
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 border border-purple-100 dark:border-purple-500/30 px-2.5 py-1 rounded-md mt-2 sm:mt-0 inline-block w-max">
            2025 – Present
          </span>
        </div>
        <p className={`text-sm font-medium ${cardBody} mb-4`}>
          Academic Capstone & Personal SaaS Projects
        </p>

        <ul
          className={`space-y-2 text-[14px] ${cardBody} list-disc list-inside ml-1 marker:text-gray-300 dark:marker:text-slate-600`}
        >
          <li>
            Architecting MindTrack, a web-based student wellness and counselor management
            system for university capstone research
          </li>
          <li>
            Developing CertiDraft, an AI-powered SaaS platform for automated certificate
            generation with subscription model
          </li>
          <li>
            Building full-stack systems using Laravel, Next.js, Supabase, OpenAI API
            integrations, and other AI APIs
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
}
