import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Trophy, Award, X, Sparkles } from 'lucide-react';
import { springFadeIn } from '../motion/variants';
import { cardBase, sectionIcon, sectionTitle, cardBody, cardTitle, linkAccent } from '../lib/ui';
import SpotlightCard from './SpotlightCard';

const achievements = [
  {
    title: '2nd Runner Up – Urian Cybersecurity League Capture the Flag (CTF) Competition',
    year: '2024',
    image: '/awards/ctf-runner-up-2024.jpg',
  },
  {
    title: 'Top 10 – Regional Programming Competition',
    year: '2025',
    image: '/awards/regional-programming-top10-2025.jpg',
  },
];

const certifications = [
  {
    title: 'Cyber Resilience Bootcamp 1 – Participation',
    org: 'Urian Cybersecurity League / FSUU, Sep 2024',
    image: '/certs/bootcamp.jpg',
  },
  {
    title: 'English Fluency CEFR Level A2',
    org: 'DynEd International / neo nexgen, Dec 2024',
    image: '/certs/dyned_english.jpg',
  },
];

export default function ExperienceAndCertsBento() {
  const [activeTab, setActiveTab] = useState('achievements');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!imagePreview) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setImagePreview(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [imagePreview]);

  return (
    <section id="about-research" className="mb-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: About & Research Timeline (7 cols) */}
        <motion.div
          variants={springFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* About Card */}
          <SpotlightCard className={`${cardBase} p-6 flex-1`}>
            <div className="flex items-center gap-2 mb-3">
              <User className={sectionIcon} size={18} />
              <h3 className={sectionTitle}>About Me</h3>
            </div>
            <div className={`space-y-3 leading-relaxed text-[14.5px] ${cardBody}`}>
              <p>
                I'm a 3rd-year IT student at{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  Father Saturnino Urios University
                </span>{' '}
                in Butuan City, deeply passionate about{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  full-stack web development
                </span>
                . I love transforming complex real-world requirements into clean, scalable, and
                intuitive systems.
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
                for reactive interfaces, with an active focus on integrating AI automation into
                practical SaaS products.
              </p>
            </div>
          </SpotlightCard>

          {/* Current Research Card */}
          <SpotlightCard className={`${cardBase} p-6 flex-1`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className={sectionIcon} size={18} />
                <h3 className={sectionTitle}>Current Projects & Research</h3>
              </div>
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 border border-purple-200/60 dark:border-purple-500/30 px-2.5 py-1 rounded-full">
                2025 – Present
              </span>
            </div>

            <h4 className={`${cardTitle} text-sm mb-1`}>Lead Developer & Researcher</h4>
            <p className={`text-xs font-medium text-slate-500 dark:text-slate-400 mb-3`}>
              Academic Capstone & Personal SaaS Architecture
            </p>

            <ul className={`space-y-2 text-[13.5px] ${cardBody} list-disc list-inside ml-1 marker:text-purple-500`}>
              <li>
                Architecting <strong>MindTrack</strong>, a student wellness and counselor management system for university capstone research.
              </li>
              <li>
                Developing <strong>CertiDraft</strong>, an AI-powered SaaS platform for automated certificate generation with smart template orchestration.
              </li>
              <li>
                Engineering systems with Laravel, Next.js, Supabase, and OpenAI/Claude API pipelines.
              </li>
            </ul>
          </SpotlightCard>
        </motion.div>

        {/* Right Column: Awards & Certifications Bento (5 cols) */}
        <motion.div
          id="awards-certs"
          variants={springFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-5 flex flex-col"
        >
          <SpotlightCard className={`${cardBase} p-6 flex-1 flex flex-col justify-between`}>
            <div>
              {/* Header with Switcher Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className={sectionIcon} size={18} />
                  <h3 className={sectionTitle}>Credentials</h3>
                </div>

                {/* Tab switcher */}
                <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('achievements')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeTab === 'achievements'
                        ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Awards
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('certs')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeTab === 'certs'
                        ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Certs
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'achievements' ? (
                <div className="space-y-3.5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                    Competitions & Honors
                  </p>
                  <ul className="space-y-3">
                    {achievements.map((item) => (
                      <li
                        key={item.title}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Trophy size={14} className="text-amber-500 shrink-0" />
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                                {item.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              Year {item.year}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setImagePreview({ src: item.image, title: item.title })}
                            className={`text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 px-2 py-1 rounded-md shrink-0 hover:bg-purple-100 dark:hover:bg-purple-500/30 transition-colors`}
                          >
                            View
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                    Certifications & Training
                  </p>
                  <ul className="space-y-3">
                    {certifications.map((cert) => (
                      <li
                        key={cert.title}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Award size={14} className="text-purple-600 dark:text-purple-400 shrink-0" />
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                                {cert.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                              {cert.org}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setImagePreview({ src: cert.image, title: cert.title })}
                            className={`text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 px-2 py-1 rounded-md shrink-0 hover:bg-purple-100 dark:hover:bg-purple-500/30 transition-colors`}
                          >
                            View
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* University Tag at the bottom */}
            <div className="pt-4 mt-4 border-t border-slate-200/70 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Father Saturnino Urios University</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">BS IT</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Lightbox Preview Modal for Certificates / Awards */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setImagePreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${imagePreview.title} preview`}
          >
            <motion.div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center max-w-[95vw] max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute -top-12 right-0 sm:top-0 sm:-right-12 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 transition-colors"
                aria-label="Close preview"
              >
                <X size={18} />
                Close
              </button>

              <img
                src={imagePreview.src}
                alt={imagePreview.title}
                className="max-w-full max-h-[85vh] w-auto rounded-xl shadow-2xl border border-white/10 object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
