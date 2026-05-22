import { motion } from 'framer-motion';
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
  return (
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
            2022 – present
          </p>
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Trophy} title="Achievements">
        <motion.div className={`${cardBase} p-5`} variants={fadeInUp}>
          <ul className="space-y-3">
            {[
              { title: "Dean's Lister", period: '2022 - 2024' },
              { title: 'Champion - University Hackathon', period: '2023' },
              { title: 'Outstanding Project Award', period: '2024' },
              { title: 'Top 10 - Regional Programming Competition', period: '2025' },
            ].map((item) => (
              <li key={item.title} className="flex flex-col">
                <span className="font-medium text-slate-800 dark:text-slate-100 text-sm">
                  {item.title}
                </span>
                <span className="text-xs text-gray-600 dark:text-slate-300 mt-0.5">
                  {item.period}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </SidebarBlock>

      <SidebarBlock icon={Award} title="Certifications">
        <motion.div className={`${cardBase} p-5`} variants={fadeInUp}>
          <ul className="space-y-4">
            {[
              {
                title: 'AWS Certified Cloud Practitioner',
                org: 'Amazon Web Services',
              },
              { title: 'Frontend Developer Certificate', org: 'Meta' },
            ].map((cert) => (
              <li key={cert.title}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100 text-sm">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">{cert.org}</p>
                  </div>
                  <a
                    href="#"
                    className={`text-xs text-gray-600 dark:text-slate-300 shrink-0 ${linkAccent}`}
                  >
                    View
                  </a>
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
              href: 'mailto:dexterbalbuena@email.com',
              icon: Mail,
              label: 'dexterbalbuena@email.com',
            },
            {
              href: 'https://github.com/dexterbalbuena',
              icon: Github,
              label: 'github.com/dexterbalbuena',
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
  );
}
