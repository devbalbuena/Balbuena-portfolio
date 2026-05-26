import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Trophy,
  Award,
  Wrench,
  Contact,
  GitBranch as Github,
  Link2 as Linkedin,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../motion/variants';
import {
  cardBase,
  sectionTitleSm,
  skillBadge,
  accentIcon,
  linkAccent,
} from '../lib/ui';

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
};

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    image: '/certs/aws.jpg',
  },
  {
    title: 'Frontend Developer Certificate',
    org: 'Meta',
    image: '/certs/frontend.jpg',
  },
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

const achievements = [
  {
    title: "Dean's Lister",
    period: '2022–2024',
    image: '/awards/deans-lister.jpg',
  },
  {
    title: 'Champion – University Hackathon',
    period: '2023',
    image: '/awards/hackathon-champion-2023.jpg',
  },
  {
    title: 'Outstanding Project Award',
    period: '2024',
    image: '/awards/outstanding-project-2024.jpg',
  },
  {
    title:
      '2nd Runner Up – Urian Cybersecurity League Capture the Flag (CTF) Competition',
    yearInline: '2024',
    image: '/awards/ctf-runner-up-2024.jpg',
  },
  {
    title: 'Top 10 – Regional Programming Competition',
    period: '2025',
    image: '/awards/regional-programming-top10-2025.jpg',
  },
];

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
];

function SidebarBlock({ icon: Icon, title, children }) {
  return (
    <motion.section variants={fadeInUp}>
      <div className="flex items-center gap-2 mb-4 group">
        <Icon className={accentIcon} size={18} />
        <h3 className={sectionTitleSm}>{title}</h3>
      </div>
      {children}
    </motion.section>
  );
}

export default function RightSidebar() {
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
    <>
      <motion.aside
      className="space-y-10 pb-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <SidebarBlock icon={Calendar} title="Education">
        <motion.div className={`${cardBase} p-5`} variants={fadeInUp}>
          <h4 className="font-bold text-slate-800 dark:text-slate-100">
            Father Saturnino Urios University
          </h4>
          <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
            BS Information Technology
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 font-medium">
            2022 – Present (3rd Year Student)
          </p>
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Trophy} title="Achievements">
        <motion.div className={`${cardBase} p-5`} variants={fadeInUp}>
          <ul className="space-y-4">
            {achievements.map((item) => (
              <li key={item.title}>
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0 flex-1 pr-1">
                    <button
                      type="button"
                      onClick={() =>
                        setImagePreview({ src: item.image, title: item.title })
                      }
                      className={`block text-left font-medium text-slate-800 dark:text-slate-100 text-sm ${linkAccent}`}
                    >
                      {item.title}
                      {item.yearInline && (
                        <span className="text-gray-500 ml-1 text-xs font-normal dark:text-slate-400">
                          ({item.yearInline})
                        </span>
                      )}
                    </button>
                    {item.period && (
                      <span className="text-gray-500 block text-xs mt-0.5 dark:text-slate-400">
                        {item.period}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setImagePreview({ src: item.image, title: item.title })
                    }
                    className={`text-xs text-gray-600 dark:text-slate-300 shrink-0 pt-0.5 ${linkAccent}`}
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Award} title="Certifications">
        <motion.div className={`${cardBase} p-5`} variants={fadeInUp}>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert.title}>
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0 flex-1 pr-1">
                    <button
                      type="button"
                      onClick={() =>
                        setImagePreview({ src: cert.image, title: cert.title })
                      }
                      className={`block text-left font-medium text-slate-800 dark:text-slate-100 text-sm ${linkAccent}`}
                    >
                      {cert.title}
                    </button>
                    <span className="text-gray-500 block text-xs mt-0.5 dark:text-slate-400">
                      {cert.org}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setImagePreview({ src: cert.image, title: cert.title })
                    }
                    className={`text-xs text-gray-600 dark:text-slate-300 shrink-0 pt-0.5 ${linkAccent}`}
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Wrench} title="Skills">
        <motion.div className={`${cardBase} p-5 space-y-5`} variants={fadeInUp}>
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
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
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Contact} title="Contact">
        <motion.div className={`${cardBase} p-5 space-y-4`} variants={fadeInUp}>
          {[
            { href: 'tel:+639912131795', icon: Phone, label: '+63 991 213 1795' },
            {
              href: 'mailto:balbuenadexter2@gmail.com',
              icon: Mail,
              label: 'balbuenadexter2@gmail.com',
            },
            {
              href: 'https://github.com/devbalbuena',
              icon: Github,
              label: 'github.com/devbalbuena', 
              external: true,
            },
            {
              href: 'https://linkedin.com/in/dexterbalbuena',
              icon: Linkedin,
              label: 'linkedin.com/in/dexterbalbuena',
              external: true,
            },
          ].map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`group flex items-center gap-3 text-sm text-gray-600 dark:text-slate-300 transition-all duration-300 hover:-translate-y-0.5 ${linkAccent}`}
            >
              <Icon
                size={16}
                className={`${accentIcon} transition-colors duration-300 group-hover:text-purple-800 dark:group-hover:text-purple-200`}
              />
              <span>{label}</span>
            </a>
          ))}
        </motion.div>
      </SidebarBlock>
    </motion.aside>

    <AnimatePresence>
      {imagePreview && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
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
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
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
              className="absolute -top-12 right-0 sm:top-0 sm:-right-12 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 transition-colors duration-300"
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
  </>
  );
}
