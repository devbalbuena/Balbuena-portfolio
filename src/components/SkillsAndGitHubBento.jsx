import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { springFadeIn } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, skillBadge } from '../lib/ui';
import GitHubActivity from './GitHubActivity';
import SpotlightCard from './SpotlightCard';

const skillThemes = {
  HTML: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-500/15 dark:text-orange-300 dark:border-white/10',
  CSS: 'bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-500/15 dark:text-sky-300 dark:border-white/10',
  JavaScript:
    'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:border-white/10',
  PHP: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-white/10',
  Laravel:
    'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/15 dark:text-red-300 dark:border-white/10',
  React:
    'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-white/10',
  MySQL: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:border-white/10',
  Figma:
    'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-white/10',
  Git: 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/15 dark:text-rose-300 dark:border-white/10',
  'Tailwind CSS':
    'bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-500/15 dark:text-teal-300 dark:border-white/10',
  'Node.js':
    'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-white/10',
  TypeScript:
    'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:border-white/10',
  'OpenAI API':
    'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:border-white/10',
  'Prompt Engineering':
    'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-500/15 dark:text-purple-300 dark:border-white/10',
  'AI Automation':
    'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:border-white/10',
  'Claude API':
    'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-white/10',
  Vercel:
    'bg-slate-50 text-slate-800 border-slate-200 dark:bg-slate-500/15 dark:text-slate-200 dark:border-white/10',
  Railway:
    'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-white/10',
  Render:
    'bg-sky-50 text-sky-800 border-sky-100 dark:bg-sky-500/15 dark:text-sky-300 dark:border-white/10',
  Netlify:
    'bg-emerald-50 text-emerald-800 border-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-white/10',
  Docker:
    'bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:border-white/10',
};

const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'CSS', 'HTML', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Backend',
    skills: ['Laravel', 'PHP', 'Node.js'],
  },
  {
    label: 'AI & Integrations',
    skills: ['OpenAI API', 'Prompt Engineering', 'AI Automation', 'Claude API'],
  },
  {
    label: 'Database & Tools',
    skills: ['MySQL', 'Git', 'Figma'],
  },
  {
    label: 'Deployment',
    skills: ['Vercel', 'Railway', 'Render', 'Netlify', 'Docker'],
  },
];

export default function SkillsAndGitHubBento() {
  return (
    <section id="skills-github" className="mb-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Technical Skills (5 cols) */}
        <motion.div
          variants={springFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-2 mb-4 group">
            <Wrench className={sectionIcon} size={18} />
            <h3 className={sectionTitle}>Technical Skills</h3>
          </div>

          <SpotlightCard className={`${cardBase} p-5 space-y-4`}>
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${skillBadge} ${skillThemes[skill] ?? ''}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </SpotlightCard>
        </motion.div>

        {/* Right Column: GitHub Activity & Languages (7 cols) */}
        <div className="lg:col-span-7">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
