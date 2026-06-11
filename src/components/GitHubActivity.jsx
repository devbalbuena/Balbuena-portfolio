import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch as Github } from 'lucide-react';
import { fadeInUp } from '../motion/variants';
import { cardBase, sectionTitleSm, accentIcon, linkAccent } from '../lib/ui';
import { useTheme } from '../context/ThemeContext';

const GITHUB_USERNAME = 'devbalbuena';
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const INTENSITY_COLORS = {
  light: ['#cbd5e1', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#334155', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4f5d95',
  Blade: '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572a5',
  Java: '#b07219',
  'Vue': '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
  Go: '#00add8',
  Rust: '#dea584',
};

const FALLBACK_LANG_COLORS = ['#a78bfa', '#34d399', '#f472b6', '#fb923c', '#38bdf8'];

function filterContributionsByYear(contributions, year, yearsMeta) {
  const meta = yearsMeta?.find((y) => y.year === year);
  if (meta?.range) {
    return contributions.filter(
      (c) => c.date >= meta.range.start && c.date <= meta.range.end,
    );
  }
  return contributions.filter((c) => c.date.startsWith(year));
}

function buildWeeks(contributions) {
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length === 0) return [];

  const firstDate = new Date(`${sorted[0].date}T12:00:00`);
  const padding = firstDate.getDay();
  const padded = [...Array(padding).fill(null), ...sorted];

  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function buildMonthLabels(weeks) {
  let prevMonth = null;
  return weeks.map((week) => {
    const day = week.find(Boolean);
    if (!day) return '';

    const month = new Date(`${day.date}T12:00:00`).getMonth();
    if (month !== prevMonth) {
      prevMonth = month;
      return MONTHS[month];
    }
    return '';
  });
}

function ContributionGrid({ contributions, isDark }) {
  const scrollRef = useRef(null);
  const hasAutoScrolled = useRef(false);
  const weeks = useMemo(() => buildWeeks(contributions), [contributions]);
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);
  const colors = isDark ? INTENSITY_COLORS.dark : INTENSITY_COLORS.light;
  const cellSize = 11;
  const gap = 3;

  useEffect(() => {
    if (hasAutoScrolled.current || !scrollRef.current || weeks.length === 0) return;

    const juneIndex = monthLabels.findIndex((label) => label === 'Jun');
    if (juneIndex === -1) return;

    scrollRef.current.scrollLeft = juneIndex * (cellSize + gap);
    hasAutoScrolled.current = true;
  }, [monthLabels, weeks.length, cellSize, gap]);

  return (
    <div className="flex gap-2">
      <div
        className="flex flex-col shrink-0 text-[10px] text-gray-500 dark:text-slate-400"
        style={{ gap, paddingTop: 18, width: 28 }}
      >
        {DAY_LABELS.map((label, i) => (
          <span
            key={i}
            className="flex items-center leading-none"
            style={{ height: cellSize }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div
          ref={scrollRef}
          className="github-scroll overflow-x-auto pb-1"
          style={{ scrollbarGutter: 'stable' }}
        >
          <div className="min-w-max">
            <div className="flex mb-1" style={{ gap, height: 14 }}>
              {monthLabels.map((label, weekIndex) => (
                <span
                  key={weekIndex}
                  className="text-[10px] text-gray-500 dark:text-slate-400 leading-none"
                  style={{ width: cellSize }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap }}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col" style={{ gap }}>
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return (
                        <span
                          key={`pad-${weekIndex}-${dayIndex}`}
                          style={{ width: cellSize, height: cellSize }}
                          aria-hidden="true"
                        />
                      );
                    }

                    const intensity = Math.min(4, Math.max(0, Number(day.intensity) || 0));

                    return (
                      <span
                        key={day.date}
                        title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                        className="rounded-sm"
                        style={{
                          width: cellSize,
                          height: cellSize,
                          backgroundColor: colors[intensity],
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchLanguageStats(username) {
  const cacheKey = `github-langs-${username}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < 60 * 60 * 1000) return data;
    }
  } catch {
    // ignore cache errors
  }

  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`,
  );
  if (!reposRes.ok) throw new Error('Repos request failed');

  const repos = await reposRes.json();
  const totals = {};

  await Promise.all(
    repos.slice(0, 15).map(async (repo) => {
      try {
        const langRes = await fetch(repo.languages_url);
        if (!langRes.ok) return;
        const langs = await langRes.json();
        Object.entries(langs).forEach(([lang, bytes]) => {
          totals[lang] = (totals[lang] || 0) + bytes;
        });
      } catch {
        // skip failed repo
      }
    }),
  );

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({ name, bytes }));

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ data: sorted, ts: Date.now() }));
  } catch {
    // ignore cache errors
  }

  return sorted;
}

function LanguageDonut({ languages }) {
  const total = languages.reduce((sum, l) => sum + l.bytes, 0);
  if (total === 0) return null;

  let cursor = 0;
  const stops = languages.map((lang, i) => {
    const pct = (lang.bytes / total) * 100;
    const color = LANG_COLORS[lang.name] ?? FALLBACK_LANG_COLORS[i % FALLBACK_LANG_COLORS.length];
    const start = cursor;
    cursor += pct;
    return `${color} ${start}% ${cursor}%`;
  });

  return (
    <div className="rounded-lg border border-gray-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/50">
      <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Top Languages by Repo
      </p>
      <div className="flex items-center gap-4">
        <ul className="min-w-0 flex-1 space-y-1.5">
          {languages.map((lang, i) => {
            const color =
              LANG_COLORS[lang.name] ?? FALLBACK_LANG_COLORS[i % FALLBACK_LANG_COLORS.length];
            const pct = Math.round((lang.bytes / total) * 100);
            return (
              <li key={lang.name} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-700 dark:text-slate-300">{lang.name}</span>
                <span className="text-gray-400 dark:text-slate-500">{pct}%</span>
              </li>
            );
          })}
        </ul>

        <div
          className="relative shrink-0 rounded-full bg-slate-50 dark:bg-slate-800/50"
          style={{ width: 88, height: 88 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `conic-gradient(${stops.join(', ')})`,
              WebkitMask: 'radial-gradient(circle, transparent 58%, black 59%)',
              mask: 'radial-gradient(circle, transparent 58%, black 59%)',
            }}
            role="img"
            aria-label={`Top languages: ${languages.map((l) => l.name).join(', ')}`}
          />
        </div>
      </div>
    </div>
  );
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

function WidgetImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
      onError={() => setFailed(true)}
    />
  );
}

export default function GitHubActivity() {
  const { isDark } = useTheme();
  const [contributions, setContributions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [langsLoading, setLangsLoading] = useState(true);
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
        const yearList = (data.years ?? [])
          .filter((y) => (y.total ?? 0) > 0)
          .sort((a, b) => b.year.localeCompare(a.year));
        setYears(yearList);
        setSelectedYear(yearList[0]?.year ?? null);
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

  useEffect(() => {
    let cancelled = false;

    async function loadLanguages() {
      setLangsLoading(true);
      setLangsFailed(false);

      try {
        const data = await fetchLanguageStats(GITHUB_USERNAME);
        if (!cancelled) setLanguages(data);
      } catch {
        if (!cancelled) setLangsFailed(true);
      } finally {
        if (!cancelled) setLangsLoading(false);
      }
    }

    loadLanguages();
    return () => {
      cancelled = true;
    };
  }, []);

  const yearContributions = useMemo(() => {
    if (!selectedYear) return contributions;
    return filterContributionsByYear(contributions, selectedYear, years);
  }, [contributions, selectedYear, years]);

  const yearTotal = useMemo(() => {
    const meta = years.find((y) => y.year === selectedYear);
    return meta?.total ?? yearContributions.reduce((sum, c) => sum + (c.count || 0), 0);
  }, [years, selectedYear, yearContributions]);

  const fallbackGraphSrc = activityGraphUrl(isDark);
  const intensityColors = isDark ? INTENSITY_COLORS.dark : INTENSITY_COLORS.light;

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
          <div className="flex gap-3">
            <div className="min-w-0 flex-1 space-y-3">
              <p className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {yearTotal.toLocaleString()}
                </span>{' '}
                contributions in {selectedYear ?? 'the last year'}
              </p>
              <ContributionGrid contributions={yearContributions} isDark={isDark} />
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-slate-400">
                <span>Less</span>
                {intensityColors.map((color) => (
                  <span
                    key={color}
                    className="rounded-sm"
                    style={{ width: 11, height: 11, backgroundColor: color }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            {years.length > 1 && (
              <div className="flex shrink-0 flex-col gap-1">
                {years.map((y) => (
                  <button
                    key={y.year}
                    type="button"
                    onClick={() => setSelectedYear(y.year)}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${
                      selectedYear === y.year
                        ? 'bg-purple-600 text-white dark:bg-purple-500'
                        : 'text-gray-500 hover:text-purple-700 dark:text-slate-400 dark:hover:text-purple-300'
                    }`}
                  >
                    {y.year}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {langsLoading ? (
          <div className="h-28 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/50" />
        ) : langsFailed ? null : (
          <LanguageDonut languages={languages} />
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
