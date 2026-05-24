import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, MapPin, Download, Mail, GitBranch as Github } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { primaryBtn, secondaryBtn } from '../lib/ui';

const PROFILE_SRC = '/profile.jpg';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <motion.header className="mb-12 relative" variants={fadeInUp}>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="View profile picture"
          className="block mb-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        >
          <img
            src={PROFILE_SRC}
            alt="Dexter Balbuena"
            className="w-24 h-24 object-cover rounded-2xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-none cursor-pointer"
          />
        </button>

        <motion.div className="flex items-center gap-2 mb-1" variants={fadeInUp}>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Dexter Balbuena
          </h1>
          <BadgeCheck className="text-purple-700 dark:text-purple-300" size={24} />
        </motion.div>

        <motion.h2
          className="text-lg text-slate-500 dark:text-slate-300 font-medium mb-3"
          variants={fadeInUp}
        >
          Full-Stack Developer · IT Student
        </motion.h2>

        <motion.div
          className="flex items-center gap-1.5 text-slate-500 dark:text-slate-300 text-sm mb-8"
          variants={fadeInUp}
        >
          <MapPin size={16} className="text-purple-700 dark:text-purple-300" />
          <span>Butuan City, Philippines</span>
        </motion.div>

        <motion.div className="flex flex-wrap items-center gap-3" variants={fadeInUp}>
          <a href="/cv.pdf" download className={primaryBtn}>
            <Download size={16} />
            Download Resume
          </a>
          <a href="mailto:dexterbalbuena@email.com" className={secondaryBtn}>
            <Mail size={16} />
            Send Email
          </a>
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
