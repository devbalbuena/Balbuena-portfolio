import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderCode, Globe, LayoutGrid, X } from 'lucide-react';
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
  secondaryBtn,
} from '../lib/ui';

const projectPlaceholder =
  'bg-violet-100 dark:bg-slate-800 dark:border-b dark:border-white/5';

const featuredProjects = [
  {
    id: 1,
    title: 'MindTrack',
    description:
      'Mental wellness tracking system with daily mood logging and journaling',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    link: 'mindtrack.vercel.app',
    image: '/screenshots/mindtrack.png',
  },
  {
    id: 2,
    title: 'RareFinds',
    description:
      'E-commerce platform for rare collectibles with full inventory management',
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    link: 'rarefinds.vercel.app',
    image: '/screenshots/rarefinds.png',
  },
  {
    id: 3,
    title: 'BookNook',
    description:
      'E-library system with digital book management and deployment',
    tech: ['Laravel', 'Blade', 'MySQL'],
    link: 'github.com/devbalbuena/BookNook',
    image: '/screenshots/booknook.png',
  },
  {
    id: 4,
    title: 'AskDocPh',
    description: 'Online doctor consultation and appointment booking platform',
    tech: ['Laravel', 'Blade', 'MySQL'],
    link: 'github.com/devbalbuena/AskDocPh',
    image: '/screenshots/askdocph.png',
  },
];

const modalOnlyProjects = [
  {
    id: 5,
    title: 'School-Library-Management-System',
    description:
      'Full-featured school library management system with borrowing and returns',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    link: 'github.com/devbalbuena/School-Library-Management-System',
    image: '/screenshots/school-library-management-system.png',
  },
  {
    id: 6,
    title: 'AccountPulse',
    description: 'Financial account tracking and pulse monitoring dashboard',
    tech: ['JavaScript', 'Tailwind CSS'],
    link: 'github.com/devbalbuena/AccountPulse',
    image: '/screenshots/accountpulse.png',
  },
  {
    id: 7,
    title: 'TaskTracker',
    description: 'Developer todo and task management application',
    tech: ['JavaScript', 'Tailwind CSS'],
    link: 'github.com/devbalbuena/TaskTracker',
    image: '/screenshots/tasktracker.png',
  },
  {
    id: 8,
    title: 'PublicLaw-Appointment-System',
    description: 'Public law office appointment and scheduling system',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'github.com/devbalbuena/PublicLaw-Appointment-System',
    image: '/screenshots/publiclaw-appointment-system.png',
  },
  {
    id: 9,
    title: 'WatchFlix-Apk',
    description: 'Movie streaming mobile APK application',
    tech: ['TypeScript'],
    link: 'github.com/devbalbuena/WatchFlix-Apk',
    image: '/screenshots/watchflix-apk.png',
  },
];

const allProjects = [...featuredProjects, ...modalOnlyProjects];

function projectHref(link) {
  return link.startsWith('http') ? link : `https://${link}`;
}

function ProjectCard({ project, variants = fadeInUp }) {
  return (
    <motion.a
      href={projectHref(project.link)}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
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
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
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
  );
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen]);

  return (
    <motion.section className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-6 group" variants={fadeInUp}>
        <FolderCode className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>Projects</h3>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <motion.div className="flex justify-center mt-8" variants={fadeInUp}>
        <button type="button" onClick={() => setModalOpen(true)} className={secondaryBtn}>
          View All Projects
        </button>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="All projects"
          >
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />

            <div
              className="relative z-10 flex min-h-full items-start justify-center p-4 sm:p-8 py-10"
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                className="w-full max-w-6xl rounded-2xl border border-white/10 bg-white dark:bg-slate-900 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-5 py-4 sm:px-6 rounded-t-2xl">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    All Projects
                  </h3>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    aria-label="Close projects modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-5 sm:p-6">
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {allProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
