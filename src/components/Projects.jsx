import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderCode,
  Globe,
  LayoutGrid,
  X,
  GitBranch as Github,
  Images,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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

const linkClass = `inline-flex items-center gap-1.5 text-xs font-medium ${mutedText} ${linkAccent}`;
const linkIconClass =
  'transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300';

const PINNED_PROJECTS = [
  {
    id: 1,
    title: 'CertiDraft',
    slug: 'certidraft',
    description:
      'AI-powered certificate generation platform that automatically creates, customizes, and manages certificates using smart templates and automation',
    tech: ['React', 'Laravel', 'OpenAI API', 'Tailwind CSS'],
    sourceCode: 'github.com/devbalbuena/CertiDraft',
  },
  {
    id: 2,
    title: 'AccountPulse',
    slug: 'accountpulse',
    description: 'A real-time token and subscription management dashboard. Track API token expiration across multiple accounts and AI models, monitor billing cycles with smart renewal alerts, and visualize spending through an analytics dashboard — all in one place. and pulse monitoring dashboard',
    tech: ['JavaScript', 'Tailwind CSS'],
    liveDemo: 'https://account-pulse-v1.vercel.app',
    sourceCode: 'github.com/devbalbuena/AccountPulse',
  },
  {
    id: 3,
    title: 'BookNook',
    slug: 'booknook',
    description:
      'E-library system with digital book management and deployment',
    tech: ['Laravel', 'Blade', 'MySQL'],
    liveDemo: 'https://elibrary-deployment.up.railway.app/',
    sourceCode: 'github.com/devbalbuena/BookNook',
  },
  {
    id: 4,
    title: 'HapsayPrint',
    slug: 'hapsayprint',
    description: 'A modern printing service management and tracking system.',
    tech: ['React', 'Laravel', 'Tailwind CSS'],
    sourceCode: 'github.com/devbalbuena/HapsayPrint',
  },
];

const modalOnlyProjects = [
  {
    id: 5,
    title: 'MindTrack',
    slug: 'mindtrack',
    description:
      'Mental wellness tracking system with daily mood logging and journaling',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    liveDemo: 'mindtrack.vercel.app',
  },
  {
    id: 6,
    title: 'School-Library-Management-System',
    slug: 'school-library-management-system',
    description:
      'Full-featured school library management system with borrowing and returns',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    sourceCode: 'github.com/devbalbuena/School-Library-Management-System',
  },
  {
    id: 7,
    title: 'RareFinds',
    slug: 'rarefinds',
    description:
      'E-commerce platform for rare collectibles with full inventory management',
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    liveDemo: 'rarefinds.vercel.app',
  },
  {
    id: 8,
    title: 'TaskTracker',
    slug: 'tasktracker',
    description: 'Developer todo and task management application',
    tech: ['JavaScript', 'Tailwind CSS'],
    sourceCode: 'github.com/devbalbuena/TaskTracker',
  },
  {
    id: 9,
    title: 'PublicLaw-Appointment-System',
    slug: 'publiclaw-appointment-system',
    description: 'Public law office appointment and scheduling system',
    tech: ['HTML', 'CSS', 'JavaScript'],
    sourceCode: 'github.com/devbalbuena/PublicLaw-Appointment-System',
  },
  {
    id: 10,
    title: 'WatchFlix-Apk',
    slug: 'watchflix-apk',
    description: 'Movie streaming mobile APK application',
    tech: ['TypeScript'],
    sourceCode: 'github.com/devbalbuena/WatchFlix-Apk',
  },
  {
    id: 11,
    title: 'AskDocPh',
    slug: 'askdocph',
    description: 'Online doctor consultation and appointment booking platform',
    tech: ['Laravel', 'Blade', 'MySQL'],
    sourceCode: 'github.com/devbalbuena/AskDocPh',
  },
  {
    id: 12,
    title: 'Kausap AI',
    slug: 'kausap-ai',
    description: 'AI-powered conversational chatbot and virtual assistant',
    tech: ['React', 'OpenAI API', 'Tailwind CSS'],
    sourceCode: 'github.com/devbalbuena/Kausap-AI',
  },
];

const allProjects = [...PINNED_PROJECTS, ...modalOnlyProjects];

const MAX_GALLERY_PHOTOS = 20;

function projectHref(url) {
  return url.startsWith('http') ? url : `https://${url}`;
}

function previewPath(slug) {
  return `/projects/${slug}/preview.jpg`;
}

function photoPaths(slug, count = MAX_GALLERY_PHOTOS) {
  return Array.from({ length: count }, (_, i) => `/projects/${slug}/photo-${i + 1}.jpg`);
}

function CardLink({ href, icon: Icon, label }) {
  return (
    <a
      href={projectHref(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      onClick={(e) => e.stopPropagation()}
    >
      <Icon size={14} className={linkIconClass} />
      {label}
    </a>
  );
}

function ProjectCard({ project, onViewPhotos, variants = fadeInUp }) {
  const previewSrc = previewPath(project.slug);

  return (
    <motion.article
      variants={variants}
      className={`group flex flex-col overflow-hidden ${cardInteractive}`}
    >
      <div
        className={`relative w-full h-40 ${projectPlaceholder} flex items-center justify-center overflow-hidden`}
      >
        <img
          src={previewSrc}
          alt={`${project.title} preview`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 dark:opacity-90"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden relative z-[1] flex-col items-center justify-center gap-2 text-gray-500 dark:text-slate-500">
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

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto">
          {project.liveDemo && (
            <CardLink href={project.liveDemo} icon={Globe} label="Live Demo" />
          )}
          {project.sourceCode && (
            <CardLink href={project.sourceCode} icon={Github} label="Source Code" />
          )}
          <button
            type="button"
            onClick={() => onViewPhotos(project)}
            className={linkClass}
          >
            <Images size={14} className={linkIconClass} />
            View Photos
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function PhotoGalleryModal({ project, onClose }) {
  const [photos, setPhotos] = useState(() =>
    photoPaths(project.slug, project.photoCount ?? MAX_GALLERY_PHOTOS),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const removePhotoAt = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, i) => i !== indexToRemove));
    setActiveIndex((prevIndex) => {
      if (indexToRemove < prevIndex) return prevIndex - 1;
      if (indexToRemove === prevIndex) return Math.max(0, prevIndex - 1);
      return prevIndex;
    });
  };

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} photo gallery`}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-[min(96vw,1200px)] max-h-[96vh] flex flex-col rounded-2xl border border-white/10 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 px-4 py-3 sm:px-5 sm:py-4 shrink-0">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">
            {project.title}
            {photos.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-slate-400">
                ({activeIndex + 1} / {photos.length})
              </span>
            )}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 shrink-0"
            aria-label="Close photo gallery"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col min-h-0 p-3 sm:p-4 overflow-hidden">
          <div className="relative mb-3 shrink-0">
            <div
              className={`w-full h-[min(70vh,720px)] rounded-xl overflow-hidden ${projectPlaceholder} flex items-center justify-center`}
            >
              {photos.length > 0 ? (
                <img
                  key={photos[activeIndex]}
                  src={photos[activeIndex]}
                  alt={`${project.title} photo ${activeIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={() => removePhotoAt(activeIndex)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-slate-500">
                  <LayoutGrid
                    size={28}
                    strokeWidth={1.25}
                    className="opacity-60 dark:opacity-40"
                    aria-hidden
                  />
                  <span className="text-xs font-medium">No photos found</span>
                </div>
              )}
            </div>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
              {photos.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === activeIndex
                      ? 'border-purple-600 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-24 h-16 object-cover"
                    onError={() => removePhotoAt(index)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [galleryProject, setGalleryProject] = useState(null);

  const overlayOpen = projectsModalOpen || galleryProject;

  useEffect(() => {
    if (!overlayOpen) return;

    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (galleryProject) setGalleryProject(null);
      else setProjectsModalOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [overlayOpen, galleryProject]);

  const handleViewPhotos = (project) => {
    setGalleryProject(project);
  };


  return (
    <motion.section id="projects" className="mb-14" variants={fadeInUp}>
      <motion.div className="flex items-center gap-2 mb-4 group" variants={fadeInUp}>
        <FolderCode className={sectionIcon} size={20} />
        <h3 className={sectionTitle}>Projects</h3>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 gap-5"
        variants={fadeInUp}
      >
        {PINNED_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewPhotos={handleViewPhotos}
          />
        ))}
      </motion.div>

      <motion.div className="flex justify-center mt-8" variants={fadeInUp}>
        <button
          type="button"
          onClick={() => setProjectsModalOpen(true)}
          className={secondaryBtn}
        >
          View All Projects
        </button>
      </motion.div>

      <AnimatePresence>
        {projectsModalOpen && (
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
              onClick={() => setProjectsModalOpen(false)}
            />

            <div
              className="relative z-10 flex min-h-full items-start justify-center p-4 sm:p-8 py-10"
              onClick={() => setProjectsModalOpen(false)}
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
                    onClick={() => setProjectsModalOpen(false)}
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
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewPhotos={handleViewPhotos}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryProject && (
          <PhotoGalleryModal
            project={galleryProject}
            onClose={() => setGalleryProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
