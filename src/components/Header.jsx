import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, MapPin, Download, Mail, GitBranch as Github } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { primaryBtn, secondaryBtn } from '../lib/ui';
import { useToast } from '../context/ToastContext';
import TypewriterSubtitle from './TypewriterSubtitle';

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
      <motion.header className="mb-12 relative" variants={fadeInUp}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="View profile picture"
            className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <img
              src={PROFILE_SRC}
              alt="Dexter Balbuena"
              className="w-32 h-32 object-cover rounded-full shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-none cursor-pointer"
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
              <a
                href="/cv.pdf"
                download
                onClick={handleDownloadResume}
                className={primaryBtn}
              >
                <Download size={16} />
                Download Resume
              </a>
              <button type="button" onClick={handleCopyEmail} className={secondaryBtn}>
                <Mail size={16} />
                Copy Email
              </button>
              <a
                href="https://github.com/devbalbuena"
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryBtn}
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </motion.header>

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
