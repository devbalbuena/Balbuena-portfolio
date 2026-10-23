import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, MapPin, Download, Mail, GitBranch as Github, Code2, ArrowUpRight } from 'lucide-react';
import { fadeInUp, springFadeIn } from '../motion/variants';
import { cardBase, primaryBtn, secondaryBtn } from '../lib/ui';
import { useToast } from '../context/ToastContext';
import TypewriterSubtitle from './TypewriterSubtitle';
import MagneticButton from './MagneticButton';
import SpotlightCard from './SpotlightCard';

const PROFILE_SRC = '/profile.jpg';
// Email split into parts to prevent bot scraping — joined at runtime only
const EMAIL_USER = 'balbuenadexter2';
const EMAIL_DOMAIN = 'gmail.com';
const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen]);

  const handleDownloadResume = () => {
    showToast('Resume downloading...');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
      showToast('Email copied to clipboard!');
    } catch {
      showToast('Could not copy email.');
    }
  };

  return (
    <>
      <SpotlightCard
        as={motion.header}
        className={`${cardBase} p-6 sm:p-8 relative w-full h-full flex flex-col justify-between`}
        variants={springFadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.06] dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="View profile picture"
            className="group shrink-0 relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 group-hover:opacity-60 blur-xs transition duration-300" />
            <img
              src={PROFILE_SRC}
              alt="Dexter Balbuena"
              className="relative w-32 h-32 object-cover rounded-full border-2 border-white dark:border-slate-800 transition-all duration-300 group-hover:scale-105 cursor-pointer shadow-sm"
            />
          </button>

          <div className="flex-1 text-center md:text-left">
            <motion.div
              className="flex items-center justify-center md:justify-start gap-2 mb-1"
              variants={fadeInUp}
            >
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Dexter Balbuena
              </h1>
              <BadgeCheck className="text-purple-700 dark:text-purple-300" size={24} />
            </motion.div>

            <TypewriterSubtitle />

            <motion.div
              className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 dark:text-slate-300 text-sm mb-4"
              variants={fadeInUp}
            >
              <MapPin size={16} className="text-purple-700 dark:text-purple-300" />
              <span>Butuan City, Philippines</span>
            </motion.div>

            <motion.div className="mb-6" variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse"
                  aria-hidden="true"
                />
                Open to freelance · Full-Stack · UI/UX · AI Projects
              </span>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center md:justify-start gap-3"
              variants={fadeInUp}
            >
              <MagneticButton>
                <a
                  href="/cv.pdf"
                  download
                  onClick={handleDownloadResume}
                  className={primaryBtn}
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                  Download Resume
                </a>
              </MagneticButton>
              <MagneticButton>
                <button type="button" onClick={handleCopyEmail} className={secondaryBtn}>
                  <Mail size={16} className="group-hover:scale-110 transition-transform duration-200" />
                  Copy Email
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://github.com/devbalbuena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryBtn}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://leetcode.com/u/devbalbuena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryBtn}
                >
                  <Code2 size={16} />
                  <span>LeetCode</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Profile picture preview"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.img
              src={PROFILE_SRC}
              alt="Dexter Balbuena — enlarged profile"
              className="relative z-10 max-w-full max-h-[85vh] w-auto rounded-2xl shadow-2xl border border-white/10 object-contain"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
