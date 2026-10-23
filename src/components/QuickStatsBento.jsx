import { motion } from 'framer-motion';
import { Trophy, GraduationCap, FolderGit2, Sparkles, ArrowRight } from 'lucide-react';
import { springFadeIn } from '../motion/variants';
import { cardBase } from '../lib/ui';
import SpotlightCard from './SpotlightCard';
import CounterNumber from './CounterNumber';

export default function QuickStatsBento() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SpotlightCard
      as={motion.div}
      variants={springFadeIn}
      className={`${cardBase} p-6 flex flex-col justify-between h-full relative`}
    >
      {/* Decorative ambient corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">
              Highlights & Focus
            </h3>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Stat 1 */}
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="group p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 text-left transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-1">
              <FolderGit2 size={16} />
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              <CounterNumber to={12} suffix="+" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Web & AI Projects
            </div>
          </button>

          {/* Stat 2 */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5">
            <div className="text-purple-600 dark:text-purple-400 mb-1">
              <GraduationCap size={16} />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              <CounterNumber
                to={3}
                formatter={(val) => (val === 1 ? '1st Year' : val === 2 ? '2nd Year' : `${val}rd Year`)}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              BS IT @ FSUU
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5">
            <div className="text-amber-600 dark:text-amber-400 mb-1">
              <Trophy size={16} />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              <CounterNumber to={10} prefix="Top " />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Regional Coding 2025
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5">
            <div className="text-emerald-600 dark:text-emerald-400 mb-1">
              <Trophy size={16} />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              <CounterNumber
                to={2}
                formatter={(val) => (val === 1 ? '1st Runner' : `${val}nd Runner`)}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Cybersecurity CTF '24
            </div>
          </div>
        </div>
      </div>

      {/* Education mini-banner */}
      <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="truncate">Father Saturnino Urios University</span>
        <span className="shrink-0 font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/20 px-2 py-0.5 rounded-md">
          2022 – Present
        </span>
      </div>
    </SpotlightCard>
  );
}
