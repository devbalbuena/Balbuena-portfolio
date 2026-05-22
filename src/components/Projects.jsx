import { motion } from 'framer-motion';
import { FolderCode, Globe, LayoutGrid } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../motion/variants';
import {
  cardInteractive,
  sectionIcon,
  sectionTitle,
  cardTitle,
  cardBody,
  techPill,
  linkAccent,
  mutedText,
} from '../lib/ui';

const projectPlaceholder =
  'bg-violet-100 dark:bg-slate-800 dark:border-b dark:border-white/5';

const projects = [
  {
    id: 1,
    title: 'MindTrack',
    description: 'Mental wellness tracking system with daily mood logging and journaling.',
    image: '/screenshots/mindtrack.png',
    link: 'https://mindtrack.vercel.app',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'RareFinds',
    description: 'E-commerce platform for rare collectibles with full inventory management.',
    image: '/screenshots/rarefinds.png',
    link: 'https://rarefinds.vercel.app',
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'CertiDraft',
    description: 'Digital certificate generation and management system for institutions.',
    image: '/screenshots/certidraft.png',
    link: 'https://certidraft.vercel.app',
    tech: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    id: 4,
    title: 'Library System',
    description: 'Local library management software with borrowing and returning features.',
    image: '/screenshots/library.png',
    link: 'https://github.com/dexterbalbuena/library',
    tech: ['Laravel', 'React', 'MySQL'],
  },
];

export default function Projects() {
  return (
    <motion.section className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-6 group" variants={fadeInUp}>
        <FolderCode className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>Selected Projects</h3>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            className={`group flex flex-col overflow-hidden ${cardInteractive}`}
          >
            <div
              className={`w-full h-40 ${projectPlaceholder} flex items-center justify-center overflow-hidden`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 dark:opacity-90"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col items-center justify-center gap-2 text-gray-500 dark:text-slate-500">
                <LayoutGrid
                  size={28}
                  strokeWidth={1.25}
                  className="opacity-60 dark:opacity-40"
                  aria-hidden
                />
                <span className="text-xs font-medium">Preview</span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h4 className={`${cardTitle} mb-2`}>{project.title}</h4>
              <p className={`text-sm ${cardBody} mb-3 flex-1`}>{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.map((tag) => (
                  <span key={tag} className={techPill}>
                    {tag}
                  </span>
                ))}
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${mutedText} ${linkAccent} mt-auto`}
              >
                <Globe
                  size={14}
                  className="transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                />
                {project.link.replace(/^https?:\/\//, '')}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
