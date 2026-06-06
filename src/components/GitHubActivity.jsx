import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch as Github } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionTitleSm, accentIcon, linkAccent } from '../lib/ui';
import { useTheme } from '../context/ThemeContext';

const GITHUB_USERNAME = 'devbalbuena';
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

function contributionsUrl(isDark) {
  const theme = isDark ? 'dark' : 'light';
  return `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?theme=${theme}`;
}

function topLanguagesUrl(isDark) {
  const params = new URLSearchParams({
    username: GITHUB_USERNAME,
    layout: 'compact',
    langs_count: '5',
    hide_border: 'true',
    hide_title: 'false',
    card_width: '400',
    title: 'Top Languages',
    bg_color: isDark ? '0f172a' : 'ffffff',
    title_color: isDark ? 'f1f5f9' : '1e293b',
    text_color: isDark ? 'cbd5e1' : '475569',
    icon_color: isDark ? 'c4b5fd' : '7c3aed',
  });
  return `https://github-readme-stats.vercel.app/api/top-langs/?${params}`;
}

export default function GitHubActivity() {
  const { isDark } = useTheme();
  const [contributionsFailed, setContributionsFailed] = useState(false);
  const [langsFailed, setLangsFailed] = useState(false);

  const contributionsSrc = contributionsUrl(isDark);
  const langsSrc = topLanguagesUrl(isDark);

  return (
    <motion.section variants={fadeInUp}>
      <div className="flex items-center gap-2 mb-4 group">
        <Github className={accentIcon} size={18} />
        <h3 className={sectionTitleSm}>GitHub Activity</h3>
      </div>

      <motion.div className={`${cardBase} p-5 space-y-4`} variants={fadeInUp}>
        <div className="overflow-hidden rounded-lg">
          {!contributionsFailed ? (
            <img
              key={contributionsSrc}
              src={contributionsSrc}
              alt={`${GITHUB_USERNAME} GitHub contribution activity`}
              loading="lazy"
              className="w-full h-auto"
              onError={() => setContributionsFailed(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 py-8 px-4 text-center">
              <Github size={24} className="text-purple-700 dark:text-purple-300 opacity-60" />
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Contribution graph unavailable right now.
              </p>
            </div>
          )}
        </div>

        {!langsFailed && (
          <div className="overflow-hidden rounded-lg">
            <img
              key={langsSrc}
              src={langsSrc}
              alt={`${GITHUB_USERNAME} top programming languages`}
              loading="lazy"
              className="w-full h-auto"
              onError={() => setLangsFailed(true)}
            />
          </div>
        )}

        {contributionsFailed && langsFailed && (
          <p className="text-sm text-gray-600 dark:text-slate-300 text-center">
            Live stats could not be loaded. View activity directly on GitHub.
          </p>
        )}

        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-medium ${linkAccent}`}
        >
          <Github size={16} className={accentIcon} />
          View profile on GitHub
        </a>
      </motion.div>
    </motion.section>
  );
}
