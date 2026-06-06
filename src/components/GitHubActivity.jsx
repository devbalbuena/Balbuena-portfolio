import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch as Github } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionTitleSm, accentIcon, linkAccent } from '../lib/ui';
import { useTheme } from '../context/ThemeContext';

const GITHUB_USERNAME = 'devbalbuena';
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

const INTENSITY_COLORS = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

function topLanguagesUrl(isDark) {
  const theme = isDark ? 'github_dark' : 'default';
  return `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language/?username=${GITHUB_USERNAME}&theme=${theme}`;
}

function activityGraphUrl(isDark) {
  const params = new URLSearchParams({
    username: GITHUB_USERNAME,
    bg_color: isDark ? '0f172a' : 'ffffff',
    color: isDark ? 'a78bfa' : '7c3aed',
    line: isDark ? '34d399' : '059669',
    point: isDark ? 'a78bfa' : '7c3aed',
    area: 'true',
    hide_border: 'true',
    custom_title: 'GitHub Activity',
    title_color: isDark ? 'f1f5f9' : '1e293b',
  });
  return `https://github-readme-activity-graph.vercel.app/graph?${params}`;
}

function buildWeeks(contributions) {
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const recent = sorted.slice(-371);
  if (recent.length === 0) return [];

  const firstDate = new Date(`${recent[0].date}T12:00:00`);
  const padding = firstDate.getDay();
  const padded = [...Array(padding).fill(null), ...recent];

  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function ContributionGrid({ contributions, isDark }) {
  const weeks = useMemo(() => buildWeeks(contributions), [contributions]);
  const colors = isDark ? INTENSITY_COLORS.dark : INTENSITY_COLORS.light;

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <span
                    key={`pad-${weekIndex}-${dayIndex}`}
                    className="h-[10px] w-[10px] rounded-sm bg-transparent"
                    aria-hidden="true"
                  />
                );
              }

              const intensity = Math.min(4, Math.max(0, Number(day.intensity) || 0));

              return (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                  className="h-[10px] w-[10px] rounded-sm"
                  style={{ backgroundColor: colors[intensity] }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function WidgetImage({ src, alt, onError }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
      onError={() => {
        setFailed(true);
        onError?.();
      }}
    />
  );
}

export default function GitHubActivity() {
  const { isDark } = useTheme();
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [langsFailed, setLangsFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      setLoading(true);
      setUseFallback(false);

      try {
        const response = await fetch(`/api/github-contributions/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Contributions request failed');

        const data = await response.json();
        if (cancelled) return;

        setContributions(data.contributions ?? []);
        setTotalContributions(
          (data.years ?? []).reduce((sum, year) => sum + (year.total ?? 0), 0),
        );
      } catch {
        if (!cancelled) setUseFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadContributions();
    return () => {
      cancelled = true;
    };
  }, []);

  const langsSrc = topLanguagesUrl(isDark);
  const fallbackGraphSrc = activityGraphUrl(isDark);

  return (
    <motion.section variants={fadeInUp}>
      <div className="flex items-center gap-2 mb-4 group">
        <Github className={accentIcon} size={18} />
        <h3 className={sectionTitleSm}>GitHub Activity</h3>
      </div>

      <motion.div className={`${cardBase} p-5 space-y-4`} variants={fadeInUp}>
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>
        ) : useFallback ? (
          <div className="overflow-hidden rounded-lg">
            <WidgetImage
              src={fallbackGraphSrc}
              alt={`${GITHUB_USERNAME} GitHub activity`}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {totalContributions !== null && (
              <p className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions in the last year
              </p>
            )}
            <ContributionGrid contributions={contributions} isDark={isDark} />
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-slate-400">
              <span>Less</span>
              {(isDark ? INTENSITY_COLORS.dark : INTENSITY_COLORS.light).map((color) => (
                <span
                  key={color}
                  className="h-[10px] w-[10px] rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        )}

        {!langsFailed && (
          <div className="overflow-hidden rounded-lg">
            <WidgetImage
              key={langsSrc}
              src={langsSrc}
              alt={`${GITHUB_USERNAME} top programming languages`}
              onError={() => setLangsFailed(true)}
            />
          </div>
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
